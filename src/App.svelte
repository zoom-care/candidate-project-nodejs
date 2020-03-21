<!--suppress ALL -->
<!-- original at https://eugenkiss.github.io/7guis/tasks#crud -->

<svelte:head>
    <title>Simple CRUD</title>
</svelte:head>

<script>
    import {onMount} from 'svelte'
    import './style.sass'

    const domain = "http://localhost:3001"
    let people = [
        {first: 'Hans', last: 'Emila'},
        {first: 'Max', last: 'Mustermann'},
        {first: 'Roman', last: 'Tisch'}
    ];

    let prefix = '';
    let first = '';
    let last = '';
    let i = 0;
    let msg = ""
    let fetchError = false

    $: msg = "no items fetched from server"

    $: filteredPeople = prefix
        ? people.filter(person => {
            const name = `${person.last}, ${person.first}`;
            return name.toLowerCase().startsWith(prefix.toLowerCase());
        })
        : people;

    $: selected = filteredPeople[i];

    $: resetInputs(selected);

    function create() {
        people = people.concat({first, last});
        i = people.length - 1;
        first = last = '';
    }

    function update() {
        selected.first = first;
        selected.last = last;
        people = people;
    }

    function remove() {
        // Remove selected person from the source array (people), not the filtered array
        const index = people.indexOf(selected);
        people = [...people.slice(0, index), ...people.slice(index + 1)];

        first = last = '';
        i = Math.min(i, filteredPeople.length - 2);
    }

    function resetInputs(person) {
        first = person ? person.first : '';
        last = person ? person.last : '';
    }

    const loadPeople = data => {
        people = data.map( person => {
            let [first = '', last = 'unknown'] = person.name.split(' ')
            person.first = first
            person.last = last
            return person
        })
    }

    async function fetchPeople() {
        console.log("Fetching data at " + domain + "/users")
        fetch(domain + "/users")
            .then(response => {
                return response.json()
            })
            .then(data => {
                msg = (data.length || 'unknown') + " " + (data.message || "records read")
                fetchError = false
                loadPeople(data.data)
            })
            .catch(error => {
                console.error(error)
                msg = error.message || "unknown error"
                fetchError = true
            })
    }

</script>

<style>
    * {
        font-family: inherit;
        font-size: inherit;
    }

    input {
        display: block;
        margin: 0 0 0.5em 0;
    }

    select {
        float: left;
        margin: 0 1em 1em 0;
        width: 14em;
    }

    .buttons {
        clear: both;
    }

    div.box {
        background-color: aliceblue;
    }

    .fetchError {
        color: red;
    }
</style>

<div class="box">

    <input placeholder="filter prefix" bind:value={prefix}>

    <select bind:value={i} size={5}>
        {#each filteredPeople as person, i}
            <option value={i}>{person.last}, {person.first}</option>
        {/each}
    </select>

    <label><input bind:value={first} placeholder="first"></label>
    <label><input bind:value={last} placeholder="last"></label>

    <div class='buttons'>
        <button on:click={create} disabled="{!first || !last}">create</button>
        <button on:click={update} disabled="{!first || !last || !selected}">update</button>
        <button on:click={remove} disabled="{!selected}">delete</button>
    </div>
    <div class="buttons">
        <button on:click={fetchPeople}>Reload Data</button>
        <span class:fetchError>{msg}</span>
    </div>
</div>
