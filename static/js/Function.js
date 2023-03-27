window.onload = function () {
  Display();
  setInterval(function () {
    window.location.reload = true;
    getData();
  }, 1000);

  data_name = localStorage.getItem('name');

  if (localStorage.getItem('name') == '' || localStorage.getItem('name') == null) {
    document.querySelector('.dash-template').style.display = 'none';
  } else {
    document.querySelector('.dash-template').style.display = 'block';
  }
};

function getData() {
  var current = localStorage.getItem('user');
  var project = localStorage.getItem('name');
  var account = localStorage.getItem('account');

  fetch('/dashboard/data')
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      // Check User Account
      var user = JSON.parse(text).fetchUser;
      user.forEach(data);
      function data(v) {
        if (account == v.email) {
          document.getElementById('user_log').innerHTML = 'User:' + ' ' + v.name;
          document.getElementById('user_email').innerHTML = v.email;
        }
      }
      // Check Theme
      var theme = JSON.parse(text).fetchTheme;
      var member = JSON.parse(text).fetchMember;
      var subproject = JSON.parse(text).fetchSubproject;
      $('#theme_data').empty();
      var theme_count = 0;
      $.each(theme, function (_, t) {
        if (t.user == account) {
          $('#theme_data').append(
            `
          <form id="dash-form" class="dash-form" method="post" action="/dashboard">
          <div class="dash-content">
            <p>*</p> <h2>` +
              t.name +
              `</h2>
          
            </div>
            <div class="dash-content_view">
              <button style="background-color: blue; color: white;" type="submit" onclick="View('` +
              t.name +
              `','` +
              t.status +
              `','` +
              t.link +
              `')" >View</button>
            </div>
            <input type="text" placeholder="Enter name" id="theme_id" name="username" value="` +
              t.name +
              `" hidden/>
            <input type="text" placeholder="Enter name" id="theme_id" name="theme_name" value="` +
              t.name +
              `" hidden/>
            <input type="text" placeholder="Enter name" id="task-` +
              t.name +
              `" name="task_name" value="" hidden />
            <input type="text" placeholder="Enter name"  name="email" value="` +
              account +
              `" hidden />
            <input type="text" placeholder="Enter name"  name="project" value="` +
              t.name +
              `" hidden />
            </form>
        `
          );

          if (t.status == 'Admin') {
            $('#theme_data').append(
              `
                 <div class="dash-content">
                   <button style="background-color: green; color: white;" onclick="Edit('` +
                t.name +
                `')">Edit</button>
                   <button style="background-color: red; color: white;" onclick="Delete('` +
                t.name +
                `')">Delete</button>
                 </div>
                 `
            );
          }

          $.each(subproject, function (_, j) {
            if (t.name === j.mainproject) {
              $('#task-' + t.name).val(j.name);
            }
          });
        }
      });

      // Display Project Details
      var data_project = JSON.parse(text).fetchData;
      position = localStorage.getItem('status');
      $('.table-header').empty();
      $('.dash-title').empty();
      $('tbody').empty();
      $('.mem-content').empty();
      $('.CreateTask').empty();
      $.each(data_project, function (_, v) {
        if (v.project == project && v.email == account) {
          $('.table-header').append(
            `
          <h3>* ` +
              v.name +
              `</h3>
                
          `
          );

          $('.dash-title').append(
            `
            <h1 id="theme-name">` +
              v.name +
              `</h1>
          `
          );

          if (position == 'Admin') {
            $('.table-header').append(
              `
                <button id="projectedit" style="background-color: green; color: white;" onclick="EditProject('` +
                v.name +
                `')">Edit</button>
             <button id="projectdelete" style="background-color: red; color: white;" onclick="DeleteProject('` +
                v.name +
                `')">Delete</button>
            <button style="background-color: blue; color: white;"><a href="/upload" style="color: white; text-decoration: none;">Upload</a></button> 
            <button style="background-color: red; color: white;" onclick="Transfer('` +
                v.email +
                `')">Transfer</button>     
            `
            );
            $('.CreateTask').append(
              `
              <button class="btn-add" id="taskbtn" onclick="SubProject('` +
                v.name +
                `')">Add Task</button>
              `
            );
          } else {
            $('.table-header').append(
              `
            <button style="background-color: blue; color: white;"><a href="/upload" style="color: white; text-decoration: none;">Upload</a></button>     
            `
            );
          }
        }

        $.each(subproject, function (_, j) {
          if (j.project == v.name && j.email == v.email && v.project == project) {
            $('tbody').append(
              `
              <tr>
                <th>
                  <div class="table-func">
                    ` +
                j.name +
                `
                  </div>
                </th>
                <th>
                  <div class="mem-content dataAdmin-` +
                j._id +
                `">
                       
                      </div>
                </th>
                <th id="memberstat">
                  <div class="add-mem btn-` +
                j._id +
                `">
                
                  </div>
                  <div class="mem-content data-` +
                j._id +
                `">
                       
                      </div>
                 </th>    
                 <th>
                  <div class="add-mem statbtn-` +
                j._id +
                `">
                   
                  </div>
                   ` +
                j.status +
                `
                   </th>
                <th>` +
                j.date +
                `</th>
                <th>
                  <div class="table-func_btn chatbtn-` +
                j._id +
                `">
                   
                  </div> 
                <th>
                 
                  <div class="table-func_btn" id="tablefunc-` +
                j._id +
                `">
                
                   
                  </div>
                </th>
              </tr> 
            `
            );

            $.each(member, function (_, d) {
              if (j.project == d.project && j.name == d.subproject && d.status == 'Admin') {
                $('.dataAdmin-' + j._id).append(
                  `
                <p class="mem-name">` +
                    d.mem_name +
                    ` </p> 
                `
                );

                if (d.status == 'Member' && d.mem_name == account) {
                }
                if (d.status == 'Admin' && d.mem_name == account) {
                  $('.statbtn-' + j._id).append(
                    `
                   <button id="membtn" onclick="EditStatus('` +
                      j.name +
                      `','` +
                      j.status +
                      `')"> +</button>
                   `
                  );
                  $('.chatbtn-' + j._id).append(
                    `
                  <button style="background-color: green; color: white;" onclick="Chat('` +
                      v.email +
                      `','` +
                      v.name +
                      `','` +
                      v.project +
                      `','` +
                      j.name +
                      `')">Chat</button>
                  `
                  );
                  $('#tablefunc-' + j._id).append(
                    `
                  <button style="background-color: green; color: white;" onclick="EditSubProject('` +
                      j.name +
                      `')">Edit</button>
              <button style="background-color: red; color: white;" onclick="DeleteSubProject('` +
                      j.name +
                      `')">Delete</button>
                  `
                  );
                  $('.btn-' + j._id).append(
                    `
                  <button id="membtn" onclick="AddMember('` +
                      j.name +
                      `','` +
                      j.project +
                      `')"> +</button>
                  `
                  );
                }
              }

              if (j.project == d.project && j.name == d.subproject && d.status == 'Member') {
                $('.data-' + j._id).append(
                  `
                <p class="mem-name">` +
                    d.mem_name +
                    ` </p> 
                    
                `
                );

                if (d.mem_name !== account) {
                  $('.data-' + j._id).append(
                    `
                
                      <button onclick="DeleteMember('` +
                      d.mem_name +
                      `','` +
                      j.name +
                      `')">-</button>
                  `
                  );
                }

                if (d.status == 'Member' && d.mem_name == account && j.name == d.subproject) {
                  $('.statbtn-' + j._id).append(
                    `
                   <button id="membtn" onclick="EditStatus('` +
                      j.name +
                      `','` +
                      j.status +
                      `')"> +</button>
                   `
                  );
                  $('.chatbtn-' + j._id).append(
                    `
                  <button style="background-color: green; color: white;" onclick="Chat('` +
                      v.email +
                      `','` +
                      v.name +
                      `','` +
                      v.project +
                      `','` +
                      j.name +
                      `')">Chat</button>
                  `
                  );
                  $('#tablefunc-' + j._id).empty();
                }
              }
            });

            // Append Group Chat
            $('.chat_dashboard').empty();
            var topic = localStorage.getItem('subproject');
            var message = JSON.parse(text).fetchMessage;
            $.each(message, function (_, m) {
              if (m.subproject == topic && account == m.user && j.project == m.project) {
                $('.chat_dashboard').append(
                  `
                     <div class="chat_admin">
                        <span> ` +
                    m.user +
                    `  ` +
                    m.time +
                    `</span>
                        <p>` +
                    m.content +
                    ` </p>
                        <button onclick="EditMessage('` +
                    m.content +
                    `')">+</button>
                        <button onclick="DeleteMessage('` +
                    m.content +
                    `')">-</button>
                      </div>
                    `
                );
              }
              if (m.subproject == topic && account !== m.user && j.project == m.project) {
                $('.chat_dashboard').append(
                  `
                    <div class="chat_member">
                    <span>` +
                    m.user +
                    `   ` +
                    m.time +
                    `</span>
                  <p>` +
                    m.content +
                    `</p>
                </div>
                    `
                );
              }
            });
          }
        });
      });
    });
}

function Display() {
  var account = localStorage.getItem('account');
  fetch('/dashboard/data')
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      var user = JSON.parse(text).fetchUser;
      // Append Contact List
      $('#memlist').empty();
      $('#translist').empty();
      $.each(user, function (_, v) {
        if (v.email !== account) {
          $('#memlist').append(
            `
         <option value="` +
              v.email +
              `">` +
              v.email +
              `</option>
         `
          );

          $('#translist').append(
            `
         <option value="` +
              v.email +
              `">` +
              v.email +
              `</option>
         `
          );
        }
      });
    });
}
const formElem = document.getElementById('form_theme');
formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/theme', {
    method: 'POST',
    body: new FormData(formElem),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Created Project');
        $('#name_theme').val('');
        Close();
      } else {
      }
    });
});

const task = document.getElementById('form-task');
task.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/subproject', {
    method: 'POST',
    body: new FormData(task),
  }).then(function (text) {
    if (text == 'success') {
      alert('Created Task');
      $('#name_subproject').val('');
      Close();
    } else {
    }
  });
  Close();
});

const EditTheme = document.getElementById('form_editt');
EditTheme.addEventListener('submit', async (e) => {
  e.preventDefault();
  $('#theme_name').empty();
  $('#theme_name').val($('#edit').val());
  await fetch('/dashboard/edit_theme', {
    method: 'POST',
    body: new FormData(EditTheme),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Project Modified');
        Close();
      } else {
      }
    });
});

const DeleteTheme = document.getElementById('form-deletet');
DeleteTheme.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/delete_theme', {
    method: 'POST',
    body: new FormData(DeleteTheme),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Project Deleted');
        Close();
      } else {
      }
    });
});

const Editproject = document.getElementById('form-editp');
Editproject.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/edit_project', {
    method: 'POST',
    body: new FormData(Editproject),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Project Modified');
        Close();
      } else {
      }
    });
});

const Deleteproject = document.getElementById('form-deletep');
Deleteproject.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/delete_project', {
    method: 'POST',
    body: new FormData(Deleteproject),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Project Deleted');
        Close();
      } else {
      }
    });
});

const EditSubproject = document.getElementById('form-edits');
EditSubproject.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/edit_subproject', {
    method: 'POST',
    body: new FormData(EditSubproject),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Task Modified');
        Close();
      } else {
      }
    });
});

const DeleteSubproject = document.getElementById('form-deletes');
DeleteSubproject.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/delete_subproject', {
    method: 'POST',
    body: new FormData(DeleteSubproject),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Subproject Deleted');
        Close();
      } else {
      }
    });
});

const Addmember = document.getElementById('form-addm');
Addmember.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/member', {
    method: 'POST',
    body: new FormData(Addmember),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Member Added');
        Close();
      } else {
      }
    });
});

const Deletemember = document.getElementById('form-deletem');
Deletemember.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/delete_member', {
    method: 'POST',
    body: new FormData(Deletemember),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Member Deleted');
        Close();
      } else {
      }
    });
});

const Editstatus = document.getElementById('form-statuse');
Editstatus.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/edit_status', {
    method: 'POST',
    body: new FormData(Editstatus),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text == 'success') {
        alert('Status Modified');
        Close();
      } else {
      }
    });
});

const Sendchat = document.getElementById('form-chat');
Sendchat.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/chat', {
    method: 'POST',
    body: new FormData(Sendchat),
  });
  $('#message').val('');
});

const Editchat = document.getElementById('form-chate');
Editchat.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/chat_edit', {
    method: 'POST',
    body: new FormData(Editchat),
  });
  Close();
});

const Deletechat = document.getElementById('form-chatd');
Deletechat.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/dashboard/delete_chat', {
    method: 'POST',
    body: new FormData(Deletechat),
  });
  Close();
});

const Transferown = document.getElementById('form-transfer');
Transferown.addEventListener('submit', async (e) => {
  e.preventDefault();
  var result = $('#translist').val();
  await fetch('/dashboard/transfer', {
    method: 'POST',
    body: new FormData(Transferown),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      console.log(text);
      if (text == 'success') {
        alert('Transfer Ownership Successful');
        localStorage.setItem('user', result);
        localStorage.setItem('status', 'Member');
        Close();
      } else {
      }
    });
});
