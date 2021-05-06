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

```
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
```
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

```
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

```
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

```
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

```
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

