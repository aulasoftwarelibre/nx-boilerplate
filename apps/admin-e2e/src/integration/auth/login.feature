#language: es
Característica: Iniciar sesion

  Escenario: Iniciar sesión como administrador con la contraseña correcta
    Dado que estoy en la página de inicio de sesión
    Cuando introduzco el usuario y la contraseña de administrador
    Entonces debo estar en la página principal

  Escenario: Iniciar sesión como administrador con la contraseña incorrecta
    Dado que estoy en la página de inicio de sesión
    Cuando introduzco mal la contraseña de administrador
    Entonces debo recibir un mensaje de permiso denegado

  Escenario: Iniciar sesión como usuario normal
    Dado que estoy en la página de inicio de sesión
    Cuando introduzco el usuario y la contraseña de un usuario normal
    Entonces debo recibir un mensaje de que mi usuario no es administrador
