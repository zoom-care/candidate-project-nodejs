function deleteComment(id: number, refEl: HTMLElement): void {
  const headers = { 'Authorization': 'ABC123' }
  request(
    'DELETE',
    `/comment/${id}`,
    (response) => {
      console.log(response)
      refEl.remove();
    },
    headers
  );
}

function request(
  requestType: string,
  url: string,
  cb: (r: object) => void = _ => {},
  headers: { [key: string]: string } | undefined
): void {
  var xhr = new XMLHttpRequest();

  xhr.open(requestType, url);

  if (headers) {
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  xhr.onload = () => {
    if (xhr.status !== 200) {
      // TODO: err response
      return;
    }

    cb(JSON.parse(xhr.response))
  };
  xhr.send();
}
