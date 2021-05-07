# 7WC: Intro to Web Dev Part 2
## Combining WEB with APIs

Now that we know the basics of HTML, CSS, and Javascript, we can start using this knowledge with something you've learnt before: APIs!

Before we get started, let's do a quick recap of a previous workshop: **Web Requests and APIs**

# Web Requests and APIs

An **API** is like a container of information. It holds a ton of information in which _we_, the users, can access based on our choosing. For example, a weather api could hold information on the weather forecast for this upcoming week, or a book api could give you information on, well, a book. 

So, how do we access the information the API is holding? We can do this through something called requests. Whenever you open a web page or download a file, you are makaing a **web request** through HTTP. Note however, that not all web requests receive information, you can send information too!

There are many types of web requests, but the two most basic web requests are the GET and POST requests. 

**GET** Requests mainly retrieve information, while **POST** requests mainly send information. Note that there are many other types of web requests out there, but the only ones we have to pay attention to today are GET, POST, and DELETE requests (it should be pretty obvious what a DELETE request does). 

**JSON** is a common way to format information in web requests. Take a look at this example:

```json
JSON_Object = {
  "name": "Mark",
  "grade": "9",
  "interests": ["soccer", "coding"]
}
```

This behaves similar to a dictionary, so say if we wanted to access the first element inside interests, we would do ```JSON_Object.interests[0]``` which would give us ```soccer```.

This is enough of a recap. If there is anything that's unclear, the full lesson for Web Requests and APIs is available [here](https://docs.google.com/document/d/19U4sAToTJldBK3TBQkOBMEiKa8n6wFA3tfXkgEVTKV4/edit).

In this workshop, we will be utilizing a todo-list api so we can make our own todo-list!

## Preliminary Steps

In order to code this out, either use [Codepen](https://codepen.io), or do it locally on your computer! If you're doing it locally, it's recommended to use a code editor such as [VSCode](https://code.visualstudio.com/). It'll make your workflow much easier!

## Setting up the HTML and CSS

We start off with the basic html file, ```index.html```. We also create a CSS file called ```index.css``` for all of our styling needs. For Codepen users, using the default HTML and CSS windows are good enough. Since we'll need to send requests to an API you will see later, I will also make a file called ```app.js```. For those coding locally, I have my files structured in this manner:

```
index.html
app.js
stylesheets
| index.css
```

We start by writing the basic boilerplate code:
```html
<!DOCTYPE html>
<html>
  <head>
  </head>

  <body>
  </body>
</html>
```

Since we're making a Todolist webapp, the two greatest features we need are
1. Creating Tasks
2. Clearing Tasks

Keeping this in mind, the first thing we have to do is link the CSS and JavaScript to the HTML. 
You do not have to do this in Codepen, but locally, or practically, you should otherwise the your webpage will have no clue on how how to communicate with the other files. 

In the ```<head>``` section, add

```html
    <link rel="stylesheet" href="stylesheets/index.css">
    <script src="app.js"></script>
    <noscript>You need to enable JavaScript to use the ToDo List!</noscript>
    <title>
      Todo List
    </title>
``` 

The first link is to get the css connected, and the script is for the JavaScript. For the fun of it, I added in a no script, so it'll let the user know that they need JavaScript in order for this to work. I also added a title (which shows up on the tab). Now what do I mean by tab? For local users, simply open up the file location of where you made the index.html in a web browser like Edge or Chrome. Note that you won't see anything right now because we aren't displaying anything yet.

## Adding some "substance"

Let's add some content to the ```<body>``` section. I would like the tasks to show up on the left side, while I have the option to add tasks on the right. To do this, I'm going to make a ```<div>``` which holds the list, and the form to create the list:

```html
    <div id="main-container">
      <div>
        <h1>TODO List</h1>
        <div id="contents">
        </div>
      </div>
     <form class="form-container">
        <h1>Add Task</h1>
        <textarea name="task_contents" id="task_contents" cols="50" rows="10"></textarea>
        <button type='submit' onclick="" class="btn">Add</button>
      </form>
    </div>
```

The ```<div>``` with id **contents** will contain the list of tasks, while the form will be our method in adding new tasks.
 
Note that I have id ```main-container``` and ```contents```, classes ```form-container``` and ```btn```, so let's add some CSS in ```index.css```.

```css
html {
  background-color: #1D1D1E;
  color: white;
  font-family: lato, arial;
}

#main-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

#contents {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn:hover {
  opacity: 1;
}

.form-container {
  padding: 10px;
}
.form-container input[type=text], .form-container textarea {
  width: 90%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
}
.form-container .btn {
  background-color: #04AA6D;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
  color: white;
}
```

Even though it's pretty basic CSS, there are some notable things to talk in here.

```display: flex;``` helps us arrange content in an easy manner, take a look at (https://www.w3schools.com/css/css3_flexbox.asp) to learn more about flex boxes.

```justify-content``` and ```align-items``` are also MVPs because they're your go tos when trying to center things. If you're ever having trouble, those are your best bet.

```.btn:hover``` activates only when your cursor is hovering over the element containing it.

If we wanted a static web page, we would basically be done. All that's left is to add the list of tasks to do in the ```content``` section, and you're done:

```html
<ul>
  <li>
    <p>Wash the dishes</p>
  </li>
  <li>
    <p>Sweep the leaves</p>
  </li>
  <li>
    <p>Jog in the morning</p>
  </li>
  <li>
    <p>Finish homework</p>
  </li>
</ul>
```

There are some elements that are unfamiliar here. ```<ul>``` stands for unordered list, and you use it when you want to display a list of items. You can also use ```<ol>``` for ordered lists. To make a list item, use the section ```<li>```. Whatever is inside that section is considered part of that list item.

## Making it dynamic

Since this needs to be dynamic, we'll use JavaScript to send web requests. Get rid of the code in ```<content>``` and instead, add a script:

```html
          <script>load_list()</script>
```

We add that function in ```app.js```:

```javascript
function load_list() {
  let html = '<ul>';
  html+= '</ul>'

  document.getElementById('contents').innerHTML = html
}
```

What does this function do? It makes an unordered list, and we overwrite the element that has the id ```contents``` to contain the html we defined, which in this case is an unordered list.

## Reading the API

Now, we actually need to get the information. Instead of using Python, we'll be using **fetch**, a built in function of JavaScript. Similar to how we sent web requests in [here](https://docs.google.com/document/d/19U4sAToTJldBK3TBQkOBMEiKa8n6wFA3tfXkgEVTKV4/edit), we can send different types of requests, modify header and body content, and choose which URL we are trying to send it to.

However, before anything, we should take a look at this ToDoList API, and its **documentation**, which can be found in this repository under ```ToDo Documentation.md```. 

The first thing we will do is have ```load_list()``` send a request. Since this is a GET request, we do not need a body, we just need to send the request with the right header information. Why? Because this API doesn't allow requests from everyone. Only those with a special access code will be able to send and receive proper requests.

I will make a new function called ```getTasks()``` to perform this operation:

```javascript
async function getTasks() {
  const URL = 'https://7wc.zhehaizhang.com/task/get/[username]'
  const Params = {
    headers: {
      'x-access-token': '[SECRET_TOKEN]',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }
  return await fetch(URL, Params)
    .then(res => res.json())
    .catch(err => console.log(err))
}
```

You will get a username from the Discord Bot _____, and the x-access-token will also be provided at the time of the workshop. Note that I include the content type, because we want the API to recognize that our request may contain JSON (not in the get request, but for the other endpoints).

### Promises

What is the ```await```, ```async```, and ```.then``` syntax used for?

When we are sending requests to APIs, we don't get our information instantaneously. We have to wait for the API to receive our request, and then wait for it to send a response back. Sometimes, ```fetch``` may be too fast and you might not get the response you are looking for. By using ```await```, we are essentially "waiting" until the fetch request has been fulfilled. 

So what is a Promise? In fact, ```fetch``` returns a Promise object, which represents the eventual completion of an asynchronous operation and its resulting value. We use the ```.then()``` syntax to handle what comes after when the operation is completed, and ```.catch()``` for if the Promise failed (e.g the request didn't go through)
Since requests are asynchronous, that is the reason why we must add ```async``` in front of the function.

Now that we have ```getTasks()```, we can call that inside our function ```load_list()```. But recall that ```getTasks()``` is an asynchronous function, so we need to put ```await``` in front of the function, as well as ```async``` in front of ```load_list()``` like so:

```javascript
async function load_list() {
  let html = '<ul>';

  const response = await getTasks();

  html+= '</ul>'

  document.getElementById('contents').innerHTML = html
}
```

Test it out to make sure that it's working by using JavaScript's print:
```console.log(response)```

You should see an empty list, because you have yet to put any tasks in yet! If you get a message like 'Auth failed' or anything, then there is most likely something wrong with your post request. Did you include the secret x-access-token?

## Displaying Content

I want to display what response contains. According to the API Documentation, they return it as a list of JSON objects. I will take advantage of JavaScript's for loop to automate this task:

```javascript
async function load_list() {
  let html = '<ul>';

  const response = await getTasks();


  for (var i = 0; i < response.length; i++) {
    html+= '<li> <h2> ID:' + response[i].taskid + '</h2> <p>' + response[i].contents + ` </p> 
            </li>`
  }

  html+= '</ul>'

  document.getElementById('contents').innerHTML = html
}
```

See how I put a list item tag around every item, and displayed the taskid using a header and the contents with a paragraph tag. 

Another thing to note is that one of the strings I used ``` ` ` ``` (backtick). This is mainly used for multiline strings, and string formatting, which I will be showing in a bit.

## Sending Requests through a third party

Wouldn't it be great if we could have a few tasks just so we can see it display? Now, we can either make the code for creating a task, or we can quickly use a third party program to send the request for now. For this, you can either use [Postman](https://www.postman.com/), or simply use the web app [Hoppscotch](https://hoppscotch.io/).

Since we want to get a few tasks in, looking at the documentation we see that it needs to be a post request to the URL https://7wc.zhehaizhang.com/task/post/[username]. Add the same headers you added for the get request, but this time, in the body add a JSON object like this:

```json
{
  "contents": "A task of your choice"
}
```

Hoppscotch simplifies it down for you, you just need to fill in the key as contents and the value as the task of your choice. Once done, you can send the request. You should receive some type of message saying how it's been updated. That means you have a task in the API! You can choose to add a few more by modifying the task contents and resending the request. Once that's done, go back to your ```index.html``` and refresh the page. Then, your tasks should be displayed on the screen!

## Adding a Create Task on the Website

Let's do the same thing we did in the 3rd party app, but this time on our own website. Going back to ```index.html```, the Add Task form is almost set up, except we need to link a function to the click.

We're going to create a function called ```submitTask()```, so add that to ```onclick=""```. 

Head over to ```app.js```, and create an asynchronous function following the documentation of the API:

```javascript
async function submitTask() {
  const URL = 'https://7wc.zhehaizhang.com/task/post/[username]'
  const Data = {
    'contents': document.getElementById('task_contents').value
  }
  const Params = {
    headers: {
      'x-access-token': '[secret-token]',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Data),
    method: 'POST'
  }
  console.log(Params)
  await fetch(URL, Params)
}
```

How did I get the text that we typed into the tag ```<textarea>```? Similar to how we overwrite the element at the id of content, this time I take the element's value at id ```task_contents```.

Another cool function you may be unfamiliar with is 

```javascript 
JSON.stringify(Data)
```

What this does is turn all the key and values in the JSON into strings. For example,

```json
{
  contents: "hi"
}
```

would be stringified into:

```json
{
  "contents": "hi"
}
```

Once that's done, we can now create and view tasks on our ToDo list! 

## Clearing Tasks

Our last step is to have the ability to clear tasks once we're done. Since we need to have the ability to clear whatever task we want, we'll need to add a button for every task displayed.

On the ```load_list()``` function, add in a button for clearing Tasks:

```javascript
  for (var i = 0; i < response.length; i++) {
    html+= '<li> <h2> ID:' + response[i].taskid + '</h2> <p>' + response[i].contents + ` </p> 
              <form>
                <button class="taskButton btn" type='submit' onclick="clearTask(${response[i].taskid});"> Clear Task </button>
              </form>
            </li>`
  }
```

We can clearly see that the next function we'll be making is ```clearTask(id)```. But how does the function know which task to clear? This is when string formatting comes into play. By using 

```javascript
${}
```

I am allowed to use javascript code inside the string. So when the clear button is clicked, ```clearTask``` is called with the specific id of the task.

Now, let's create the ```clearTask(id)``` function:

```javascript
async function clearTask(id) {
  const URL = 'https://7wc.zhehaizhang.com/task/delete/[username]'
  const Data = {
    'id': id
  }
  const Params = {
    headers: {
      'x-access-token': '[secret token]',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Data),
    method: 'DELETE'
  }
  await fetch(URL, Params)
}
```

We call a delete request this time, with id as the Data.

Lastly, add some CSS to the button:

```css
.taskButton {
  background-color: green; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  opacity: 0.9;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}
```

Reload the page once more, and we're done!
