function Add() {
  document.querySelector('.modal').style.display = 'block';
  var theme = document.getElementById('theme-name').innerHTML;
  document.getElementById('theme').value = theme;
}

function Close() {
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.modal-theme').style.display = 'none';
  document.querySelector('.modal-theme_edit').style.display = 'none';
  document.querySelector('.modal-theme_delete').style.display = 'none';
  document.querySelector('.modal-subproject').style.display = 'none';
  document.querySelector('.modal-project_edit').style.display = 'none';
  document.querySelector('.modal-project_delete').style.display = 'none';
  document.querySelector('.modal-subproject_edit').style.display = 'none';
  document.querySelector('.modal-subproject_delete').style.display = 'none';
  document.querySelector('.modal-member').style.display = 'none';
  document.querySelector('.modal-member_delete').style.display = 'none';
  document.querySelector('.modal-status_edit').style.display = 'none';
  document.querySelector('.modal-chat_edit').style.display = 'none';
  document.querySelector('.modal-chat_delete').style.display = 'none';
  document.querySelector('.modal-transfer').style.display = 'none';

  localStorage.removeItem('project');
  localStorage.removeItem('mainproject');
  localStorage.removeItem('subproject');
}

function CloseChat() {
  document.querySelector('.modal-chat').style.display = 'none';
}

function CloseMessage() {
  document.querySelector('.modal-chat_edit').style.display = 'none';
  document.querySelector('.modal-chat_delete').style.display = 'none';
}

function AddTheme() {
  document.querySelector('.modal-theme').style.display = 'block';
  var user = localStorage.getItem('account');
  document.getElementById('user_n').value = user;
}

function Edit_Theme() {
  localStorage.setItem('name', document.getElementById('edit').value);
}

function View(data, status, link) {
  localStorage.setItem('name', data);
  localStorage.setItem('status', status);
  localStorage.setItem('link', link);
  document.getElementsByClassName('btn-new').style.display = 'block';
}

function Edit(name) {
  document.querySelector('.modal-theme_edit').style.display = 'block';
  document.getElementById('edit').value = name;
  document.getElementById('edit_theme').value = name;
}

function Delete(name) {
  document.querySelector('.modal-theme_delete').style.display = 'block';
  document.getElementById('delete').innerHTML = name + '?';
  document.getElementById('delete_theme').value = name;
}

function Yes() {
  localStorage.removeItem('name');
}

function SubProject(name) {
  document.getElementById('subproject').value = name;
  document.getElementById('sub_email').value = localStorage.getItem('account');
  document.querySelector('.modal-subproject').style.display = 'block';
  document.getElementById('mainproject').value = localStorage.getItem('name');
}

function EditProject(data) {
  document.querySelector('.modal-project_edit').style.display = 'block';
  document.getElementById('editproject').value = data;
  document.getElementById('edit_project').value = data;
}

function DeleteProject(name) {
  document.querySelector('.modal-project_delete').style.display = 'block';
  document.getElementById('deleteproject').innerHTML = name + '?';
  document.getElementById('delete_project').value = name;
}

function EditSubProject(data) {
  document.querySelector('.modal-subproject_edit').style.display = 'block';
  document.getElementById('editsubproject').value = data;
  document.getElementById('edit_subproject').value = data;
  document.getElementById('sub_mainproject').value = localStorage.getItem('name');
}

function DeleteSubProject(name) {
  document.querySelector('.modal-subproject_delete').style.display = 'block';
  document.getElementById('deletesubproject').innerHTML = name + '?';
  document.getElementById('delete_subproject').value = name;
  document.getElementById('subdelete_mainproject').value = localStorage.getItem('name');
}

function AddMember(name, project) {
  document.getElementById('memberproject').value = project;
  document.getElementById('membersubproject').value = name;
  document.querySelector('.modal-member').style.display = 'block';
  document.getElementById('membermainproject').value = localStorage.getItem('name');
}

function DeleteMember(name, task) {
  document.querySelector('.modal-member_delete').style.display = 'block';
  document.getElementById('deletemember').innerHTML = name + '?';
  document.getElementById('delete_member').value = name;
  document.getElementById('deletesub').value = task;
  document.getElementById('delete_member_mainproject').value = localStorage.getItem('name');
}

function Logout() {
  localStorage.removeItem('name');
  localStorage.removeItem('status');
}

function Chat(user, project, mainproject, subproject) {
  localStorage.setItem('project', project);
  localStorage.setItem('mainproject', mainproject);
  localStorage.setItem('subproject', subproject);

  document.querySelector('.modal-chat').style.display = 'block';
  document.getElementById('messageproject').value = project;
  document.getElementById('messagemainproject').value = mainproject;
  document.getElementById('messageuser').value = localStorage.getItem('account');
  document.getElementById('messagesubproject').value = subproject;
  document.getElementById('groupname').innerHTML = subproject + ' ' + 'Group Chat';
}

function EditMessage(content) {
  document.querySelector('.modal-chat_edit').style.display = 'block';
  document.getElementById('contentdet').value = content;
  document.getElementById('content').value = content;
}

function DeleteMessage(content) {
  document.querySelector('.modal-chat_delete').style.display = 'block';
  document.getElementById('deletechat').innerHTML = 'Chat ?';
  document.getElementById('deletemessage').value = content;
}

function EditStatus(project, status) {
  document.querySelector('.modal-status_edit').style.display = 'block';
  document.getElementById('editstatus').value = status;
  document.getElementById('statusgroup').value = project;
  document.getElementById('status_mainproject').value = localStorage.getItem('name');
}

function DeleteCount() {
  localStorage.removeItem('count');
}

function Transfer() {
  document.querySelector('.modal-transfer').style.display = 'block';
  document.getElementById('trans_email').value = localStorage.getItem('account');
  document.getElementById('trans_theme').value = localStorage.getItem('name');
  document.getElementById('trans_link').value = localStorage.getItem('link');
}
