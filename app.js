'use strict'

async function getTasks() {
  const URL = 'https://7wc.zhehaizhang.com/task/get/275707420595191808'
  const Params = {
    headers: {
      'x-access-token': '7wc-zhehai',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }
  return await fetch(URL, Params)
    .then(res => res.json())
    .catch(err => console.log(err))
}

async function load_list() {
  let html = '<ul>';
  const response = await getTasks();
  // console.log(response)
  for (var i = 0; i < response.length; i++) {
    html+= '<li> <h2> ID:' + response[i].taskid + '</h2> <p>' + response[i].contents + ` </p> 
              <form>
                <button class="taskButton btn" type='submit' onclick="clearTask(${response[i].taskid}); return false"> Clear Task </button>
              </form>
            </li>`
  }
  html+= '</ul>'

  document.getElementById('contents').innerHTML = html
}

async function submitTask() {
  const URL = 'https://7wc.zhehaizhang.com/task/post/275707420595191808'
  const Data = {
    'contents': document.getElementById('task_contents').value
  }
  const Params = {
    headers: {
      'x-access-token': '7wc-zhehai',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Data),
    method: 'POST'
  }
  console.log(Params)
  await fetch(URL, Params)
  document.getElementById('task_contents').value = ""
  load_list()
}

async function clearTask(id) {
  const URL = 'https://7wc.zhehaizhang.com/task/delete/275707420595191808'
  const Data = {
    'id': id
  }
  const Params = {
    headers: {
      'x-access-token': '7wc-zhehai',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Data),
    method: 'DELETE'
  }
  await fetch(URL, Params)
  load_list()
}
