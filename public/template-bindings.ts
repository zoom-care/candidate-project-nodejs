function deleteComment(id: number, refEl: HTMLElement): void {
  request('DELETE', `/comment/${id}`, (response) => {
    console.log(response)
    refEl.remove();
  });
}

function request(
  requestType: string,
  url: string,
  cb: (r: object) => void = _ => {}
): void {
  var xhr = new XMLHttpRequest();
  xhr.open(requestType, url);
  xhr.onload = () => {
    if (xhr.status !== 200) {
      // TODO: err response
      return;
    }

    cb(JSON.parse(xhr.response))
  };
  xhr.send();
}
