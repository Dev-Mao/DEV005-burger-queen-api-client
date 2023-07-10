# Burger Queen
![Burger queen](https://github.com/Dev-Mao/DEV005-burger-queen-api-client/blob/Mao/assets_readme/VistasBQ.png?raw=true)

Para ingresar a la aplicación web, utilizarla y verificar su funcionalidad, ingresa a este link: [Burger Queen](https://dev-005-burger-queen-api-client-dev-mao.vercel.app/), con los siguientes datos: 

|Administrador            |Mesero                   |Chef                   |
|-------------------------|-------------------------|-----------------------|
|Correo: admin@gmail.com  |Correo: waiter@gmail.com |Correo: chef@gmail.com |
|Contraseña: 123456       |Contraseña: 123456       |Contraseña: 123456     |

## Índice

* [1. Resumen del proyecto](#1-acerca-del-proyecto)
* [2. Historias de Usuario](#2-historias-de-usuario)
* [3. Prototipo de Alta Fidelidad](#3-prototipo-de-alta-fidelidad)
* [5. Test de Usabilidad](#5-test-de-usabilidad)

***

## 1. Acerca del proyecto

Sistema de pedidos para restaurante de hamburguesas llamado Burger Queen. El sistema debe permitir a los meseros tomar pedidos desde una tablet y enviarlos a la cocina de manera eficiente.

La interfaz de usuario, implementada como una Single Page App, permite a los meseros ingresar al sistema utilizando credenciales asignadas por el administrador. Una vez autenticados, los meseros pueden tomar pedidos de los clientes. La interfaz muestra los dos menús disponibles (desayuno y resto del día) y permite agregar y eliminar productos del pedido. También muestra un resumen y el total de la compra.

La API, desarrollada utilizando JavaScript (ES6+) y empaquetada de manera automatizada, se encarga de recibir los pedidos de la interfaz y almacenarlos en una base de datos. Además, la API proporciona funcionalidades adicionales, como permitir al jefe de cocina ver los pedidos en orden y marcarlos como completados, y permitir a los meseros ver los pedidos listos para servir y marcarlos como entregados.

El proyecto se ha realizado utilizando React.
Además de la funcionalidad principal, se ha implementado la administración de usuarios y productos, permitiendo al administrador gestionar el personal y mantener actualizado el menú del restaurante.

Esta es la información que tenemos del restaurante:
> Somos **Burguer Queen**, una cadena de comida 24hrs.
>
> Nuestra propuesta de servicio 24hrs ha tenido muy buena acogida y, para
> seguir creciendo, necesitamos un sistema que nos ayude a tomar los pedidos de
> nuestrxs clientxs.
>
> Tenemos 2 menús: uno muy sencillo para el desayuno:
>
> | Ítem                      |Precio $|
> |---------------------------|------|
> | Café americano            |    5 |
> | Café con leche            |    7 |
> | Sandwich de jamón y queso |   10 |
> | Jugo de frutas natural    |    7 |
>
> Y otro menú para el resto del día:
>
> | Ítem                      |Precio|
> |---------------------------|------|
> |**Hamburguesas**           |   **$**   |
> |Hamburguesa simple         |    10|
> |Hamburguesa doble          |    15|
> |**Acompañamientos**        |   **$**   |
> |Papas fritas               |     5|
> |Aros de cebolla            |     5|
> |**Para tomar**             |   **$**   |
> |Agua 650ml                 |     5|
> |Agua 750ml                 |     7|
> |Bebida/gaseosa 650ml       |     7|
> |Bebida/gaseosa 750ml       |     10|
>
> Nuestros clientes son bastante indecisos, por lo que es muy común que cambien
> el pedido varias veces antes de finalizarlo.

## 2. Historias de Usuario

Estas son las historias de usuario solicitadas con las que cumplimos en este proyecto.

### Historia de usuario 1 / Usuario "mesero"
**Yo como mesero quiero poder ingresar al sistema de pedidos con mis credenciales para poder visualizar los productos.**

* El usuario accede a la pantalla de login.
* El usuario ingresa con email y contraseña.
* Se muestran mensajes de error comprensibles, dependiendo de cuál es el error con la información ingresada.
* El usuario ingresa al sistema de pedidos cuando las credenciales son correctas.

### Historia de usuario 2  / Usuario "mesero"
**Yo como mesero quiero tomar el pedido de un cliente para no depender de mi mala memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y que se puedan ir preparando en orden.**

* El usuario anota el nombre del cliente.
* El usuario agrega productos al pedido.
* El usuario elimina productos de la orden (pedido).
* El usuario ve el resumen y el total de la compra.
* El usuario envía el pedido a cocina.

### Historia de usuario 3 / Usuario "chef"
**Yo como jefe de cocina quiero ver los pedidos de los clientes en orden y marcar cuáles están listos para saber qué se debe cocinar y avisar a los meseros que un pedido está listo para servirlo a un cliente.**

* El  usuario ve los pedidos ordenados según se van haciendo.
* El usuario marca los pedidos que se han preparado y están listos para servirse.

### Historia de usuario 4 / Usuario "mesero"
**Yo como mesero quiero ver los pedidos que están preparados para entregarlos rápidamente a los clientes que las hicieron.**

* El usuario ve el listado de pedido listos para servir.
* El usuario marca pedidos que han sido entregados.

### Historia de usuario 5 / Usuario "administrador"
**Yo como administrador(a) de tienda quiero gestionar a los usuarios de la plataforma para mantener actualizada la información de mis trabajadores.**

* El usuario ve listado de trabajadores.
* El usuario agregar trabajadores.
* El usuario elimina trabajadores.
* El usuario actualiza los datos de los trabajadores.

### Historia de usuario 6 / Usuario "administrador"
**Yo como administrador(a) de tienda quiero gestionar los productos para mantener actualizado el menú.**

* El usuario ve listado de productos.
* El usuario agregar productos.
* El u*uario elimina productos.
* El usuario actualiza los datos de los productos.

**Todas nuestras historias de usuario, cumplen los las siguientes definiciones de terminado:**

* Se recibió code review de compañeras.
* Se realizó test unitarios.
* Hicimos tests de usabilidad e incorporaste el feedback del usuario.
* Desplegamos la aplicación [click aquí](https://dev-005-burger-queen-api-client-dev-mao.vercel.app/) y hemos etiquetado tu versión (git tag).

## 3. Prototipo de Alta Fidelidad

Haz [clic aquí](https://www.figma.com/proto/9XlW2i5X4l2gEkKJOuVOny/Burger-Queen?node-id=22-4) o sobre la imagen para interactuar con el prototipo en vista horizontal.

[![prototipo-de-alta-fidelidad-horizontal](https://github.com/Dev-Mao/DEV005-burger-queen-api-client/blob/Mao/assets_readme/horizontal-proto.png?raw=true)](https://www.figma.com/proto/9XlW2i5X4l2gEkKJOuVOny/Burger-Queen?node-id=22-4)

Haz [clic aquí](https://www.figma.com/proto/9XlW2i5X4l2gEkKJOuVOny/Burger-Queen?node-id=1-3&starting-point-node-id=1%3A3) o sobre la imagen para interactuar con el prototipo en vista vertical.

[![prototipo-de-alta-fidelidad-vertical](https://github.com/Dev-Mao/DEV005-burger-queen-api-client/blob/Mao/assets_readme/vertical-proto.png?raw=true)](https://www.figma.com/proto/9XlW2i5X4l2gEkKJOuVOny/Burger-Queen?node-id=1-3&starting-point-node-id=1%3A3)