<i>Simple TODO list app using Node.js, Express and MondoDB</i>

<h3>Getting Started</h3>

- git clone
- npm i
- npm start
- localhost:4000

TODO list include <b>registration and authorization, category page and list of todos</b>.

After authorization user should be able to:
- Choose a category of todos
- See a list of todos
- Create a new item in todo list
- Update an existing item in todo list
- Delete an existing item in todo list



<table cellpadding="4" cellspacing="0" summary="" class="table" frame="border" border="1" rules="all">
    <caption>
        <span class="tablecap">App endpoints</span>
    </caption>
    <colgroup>
        <col style="width:18.75%">
        <col style="width:13.5%">
        <col style="width:13.75%">
        <col style="width:13.75%">
        <col style="width:23.75%">
    </colgroup>
    <thead class="thead" style="text-align:left;">
    <tr class="row">
        <th style="text-align:left;vertical-align:top;background: #f6fafd; padding: 8px">HTTP method</th>
        <th style="text-align:left;vertical-align:top;background: #f6fafd; padding: 8px">URI path</th>
        <th style="text-align:left;vertical-align:top;background: #f6fafd; padding: 8px">Accept</th>
        <th style="text-align:left;vertical-align:top;background: #f6fafd; padding: 8px">Response</th>
        <th style="text-align:left;vertical-align:top;background: #f6fafd; padding: 8px">Description</th>
    </tr>
    </thead>
    <tbody class="tbody">
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">GET</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">-</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">-</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Retrieves authorization form.</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">POST</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/login</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">email: liliia@gmail.com, password: 12345</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{ email: liliia@gmail.com, password: 12345 } </td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Log in</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">POST</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/signup</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">email: liliia@gmail.com, password: 12345</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{ email: liliia@gmail.com, password: 12345 } </td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Retrieves singup data</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">POST</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/tasks</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Template with list of tasks</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">List of tasks, task form</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Retrieves data of tasks</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">POST</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/add-task</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Wash dishes</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{task: Wash dishes, userId: 00000, type: home}</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Add new item</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">PUT</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/update</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{task: Wash dishes, userId: 00000, type: home}</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{task: Wash dishes, userId: 00000, type: home, classDone: class-done}</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Update item to "done"</td>
    </tr>
    <tr class="row">
        <td style="text-align:left;vertical-align:top; padding: 8px">DELETE</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">/remove</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{task: Wash dishes, userId: 00000, type: home}</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">{}</td>
        <td style="text-align:left;vertical-align:top; padding: 8px">Delete item</td>
    </tr>
    </tbody>
</table>



