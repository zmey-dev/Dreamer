# Overview
Laravel <a href="https://laravel.com/docs/master/sanctum#main-content" target="_blank">Sanctum</a> Laravel Basic authorization process for user API registration and login with validations and response token.</a>

Server Requirements
=====================================
<ul>
  <li><a href="https://www.php.net/" target="_blank">PHP Version</a> => 7.4 or higher</li>
  <li><a href="https://laravel.com/docs/master" target="_blank">Laravel Version</a> => 8 or higher</li>
  <li><a href="https://www.mysql.com/" target="_blank">MySQL Version</a> => 5.7 or higher</li>
</ul>

# Project Requirement
<ul>
  <li>Sanctum implement into Laravel Project </li>  
  <li><b>Login api : http://127.0.0.1:8000/api/login </b></li>
  <li>Login Fields</li>
  <li>Email : [ Validation Rules : Valid Unique Email, Required ] </li>
  <li>Password : [ Validation Rules : Strong Password, Required ]</li>  
  <li><b>Register api : http://127.0.0.1:8000/api/register </b></li>
  <li>Register Fields</li>
  <li>Name : [ Validation Rules : Only String allowed, Max 100 length, Required ]</li>
  <li>Email : [ Validation Rules : Valid Unique Email, Required ] </li>
  <li>Password : [ Validation Rules : Strong Password, Required ]</li>
  <li><b>Logout api : http://127.0.0.1:8000/api/logout </b></li>
  <li>For logout pass current logedIn token as Header Bearer</li> 
  <li><b>Refresh api : http://127.0.0.1:8000/api/refresh </b></li>
  <li>Refresh token on basis of old token verification and generate new token as Header Bearer</li> 
   <li><b>Profile api : http://127.0.0.1:8000/api/profile </b></li>
  <li>Get existing loggedin user full details as Header Bearer</li> 
   <li><b>Change Password api : http://127.0.0.1:8000/api/change-password </b></li>
  <li>UpdatePassword on basis of Old password, new Password and new password confirmation as Header Bearer</li> 
   <li><b>Update Password with Token : 3 Steps apis </b></li>
   <li>Forget Password api : http://127.0.0.1:8000/api/forget-password</li> 
   <li>send email to change Password token</li> 
   <li>Verify Token api : http://127.0.0.1:8000/api/password/reset/{token?}/{email?}</li> 
   <li>token Verification</li>
   <li>Update Password By Token api : http://127.0.0.1:8000/api/update-password</li> 
   <li>updatePasswordByToken on basis of Token and Password</li>
</ul>

# Laravel / PHP Coding Standards
<ol>
 <li>Use Laravel's migration scripts for database schema and tables related to further all operations</li>
 <li>Use Laravel's factory and seeders for sample dummy data creations where required</li>
 <li>Use Laravel's validation using Request classes where required</li>
 <li>Use Laravel's Eloquent and Relationships in models where required</li>
 <li>Use camel case for function name and variable name. E.g getProductDetails() , $categoryDetails </li>
 <li>Comment on the above function with short details of that function use or purpose of function creation. </li>
 <li>Reuse the common codes using some helper class functions etc</li>
 <li>Remove unnecessary code and debug points that are not needed</li>
 <li>Avoid unnecessary loops if not required</li>
 <li>Avoid unnecessary variable creations</li>
 <li>Use PHP design patterns where required <a href="https://refactoring.guru/design-patterns/php" target="_blank">Design Patterns</a></li>    <li>Normalize database tables where required <a href="https://www.guru99.com/database-normalization.html" target="_blank">Database Normalization</a></li>
 <li>Optimize database tables</li>
 <li>Avoid MySQL joins queries if not required</li>
 <li>Avoid MySQL sub queries if it does not require</li>
 <li>For more information, please read the document <a href="https://drive.google.com/drive/folders/1_nxEPw01QnVkVQfZ2WtXyeX7NcQ6ENdh" target='_blank'>Code Standard</a>
</ol>

# References
<ol>
 <li>https://laravel.com/docs/master/sanctum#main-content</li>
 <li>https://www.positronx.io/build-secure-php-rest-api-in-laravel-with-sanctum-auth/</li>
 <li>https://www.itsolutionstuff.com/post/laravel-9-rest-api-authentication-using-sanctum-tutorialexample.html</li>
 <li>https://www.youtube.com/watch?v=P2dfXpUHy6U&t=5s</li>
 <li>https://www.youtube.com/watch?v=YuIbOzvS-Jk</li>
<ol> 

# Search Key
<ol>
  <li>KEY : SANCTUM</li>
</ol>
