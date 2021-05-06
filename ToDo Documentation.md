This API is hosted at https://7wc.zhehaizhang.com

## Endpoints

- Task Endpoints:
  - Get Tasks

  ```
  https://7wc.zhehaizhang.com/task/get/[username]
  ```

  This endpoint returns a list of all user's tasks in list format, with each list item containing a JSON item holding the contents of the task, and the unique task id.

  ```json
  [
    {
      "contents": "Finish English Essay",
      "taskid": "4"
    },
    {
      "contents": "Finish Math Homework",
      "taskid": "5"
    }
  ]
  ```

  - Create Task

  ```
  https://7wc.zhehaizhang.com/task/post/[username]
  ```

  This endpoint takes in a JSON object containing the contents of a task, and creates the task.

  ```json
  {
    "contents": "Do 100 pushups"
  }
  ```

  - Clear Task

  ```
  https://7wc.zhehaizhang.com/task/clear/[username]
  ```

  This endpoint takes in a JSON object containing the id of the task, and removes it.

  ```json
  {
    "id": "1"
  }
  ```
