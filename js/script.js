document.addEventListener('DOMContentLoaded', () => {
    

    const usersDatabase = [
        {
            username:"ana123",
            password:"contraseña123"
        },
        {
            username:"pedro456",
            password:"clave456"
        },
        {
            username:"luis789",
            password:"password789"
        },
        {
            username: "maria001",
            password: "mariaPassword1"
        },
        {
            username: "jorge321",
            password: "jorgePass321"
        },
        {
            username: "lucia456",
            password: "luciaSecret456"
        }
    ]

    const usersTimeLine = [
        {
            username:"ana123",
            timeline:"I'm coding! 🖥️"
        },
        {
            username:"pedro456",
            timeline:"I'm learning Python 💻"
        },
        {
            username:"luis789",
            timeline:"New project at work! 🚀"
        },
        {
            username: "maria001",
            timeline: "Travelling around the world 🌍✈️"
        },
        {
            username: "jorge321",
            timeline: "Just started to read my new fiction book! 📚"
        },
        {
            username: "lucia456",
            timeline: "Preparing my next marathon 🏃‍♀️"
        }
    ]

    //Función que itera en nombres y contraseñas, que cuando sean iguales, o sea, coincidan, pueda acceder al feed. Además convierte mayus y minus para evitar errores. Una vez hace el bucle y no encuentra similitudes, sale y hace false, mostrando un mensaje en la siguiente función.
    //He cambiado el método para que sea más sencillo, igualmente itera cada elemento y compara usuario y contraseña
    function userValidation(username, password) {
        return usersDatabase.some(
            user => user.username.toLowerCase() === username.toLowerCase() && user.password === password
        )
    }

    

    //Función que una vez ha validado nombre y contraseña, muestra el feed en un div final que mientras no se accede, permanece bloqueado.
    function logIn(username, password) {
        const resultDiv = document.getElementById('result')
        const loginCard = document.querySelector('.login-card-content')

        if(userValidation(username, password)) {
            loginCard.style.display = 'none'
            resultDiv.style.display = 'block'

            //Después la variable busca en el objeto del feed el nombre igual al que se introduce (arrow fn) y primero se verá el post de la persona que accede.
            const userTimeline = usersTimeLine.find(user => user.username.toLowerCase() === username.toLowerCase())

            //Aquí se modifica el contenido del html con el post que ha escrito el usuario.
            let htmlContent = `
            <h2 class="welcome-message">Welcome back, ${username}! 🎉</h2>
            <p>My post: "${userTimeline.timeline}"</p>`

            //El bucle forEach itera cada objeto del array de la timeline (arrow fn). Y lo que hará el if será fijarse en la condición para que cuando itere y encuentre el mismo nombre de quien inició sesión evite mostrarse de nuevo su post, porque ya aparece primero. Y += va añadiendo.
            usersTimeLine.forEach(user => {
                if(user.username.toLowerCase() !== username.toLowerCase()) {
                htmlContent += `
                    <p><strong>${user.username}</strong>: ${user.timeline}</p>`
                }
            })
            
            //Esto hace que "pegue" el contenido que sacamos del forEach en el div para el feed.
            resultDiv.innerHTML = htmlContent

        } else {
            //Por el contrario si la primera función devuelve false, añadiendo contenido al html.
            resultDiv.innerHTML = `<p>❌ Try again, username or password is wrong.</p>`
            resultDiv.style.display = 'block'
        }
    }

    //Esto hace que muestre-oculte la contraseña
    document.getElementById('checkbox').addEventListener('change', function() {
        const passwordInput = document.getElementById('password')
        //Esto es un operador ternario, es un if/else acortado. Verifica si el checkbox está marcado, osea true o false, ? entonces, text es el valor true, : sino, password es false.
        passwordInput.type = this.checked ? 'text' : 'password'
    })

    //Esto "escucha" al submit y hace un evento que será la acción del usuario cuando envía los datos, y así aparezca el feed.
    document.getElementById('loginButton').addEventListener('click', function() {

        //Y esto capta los datos que el usuario introduce en los inputs, con le método trim para eliminar espacios en blanco.
        const username = document.getElementById('username').value.trim()
        const password = document.getElementById('password').value.trim()

        //Como hemos cambiado el form por un div, para no dar error en Github, es necesario añadir esta validación para cuando haya algún fallo y aparezca en el div final.
        if (!username || !password) {
            const resultDiv = document.getElementById('result')
            resultDiv.innerHTML = `<p class="error-message">❌ Username or password is wrong, try again!.</p>`
            resultDiv.style.display = 'block'
            return
        }

        //Finalmente llamamos a la función que le pasa los valores del inicio
        logIn(username, password)
    })
})