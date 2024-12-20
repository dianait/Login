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
            timeline:"Estoy estudiando programación 🖥️"
        },
        {
            username:"pedro456",
            timeline:"Aprendiendo Python 💻"
        },
        {
            username:"luis789",
            timeline:"¡Nuevo proyecto de trabajo! 🚀"
        },
        {
            username: "maria001",
            timeline: "Viajando por el mundo 🌍✈️"
        },
        {
            username: "jorge321",
            timeline: "¡Empecé a leer mi primer libro de ciencia ficción! 📚"
        },
        {
            username: "lucia456",
            timeline: "Preparándome para mi primer maratón 🏃‍♀️"
        }
    ]

    //Función que itera en nombres y contraseñas, que cuando sean iguales, o sea, coincidan, pueda acceder al feed. Además convierte mayus y minus para evitar errores. Una vez hace el bucle y no encuentra similitudes, sale y hace false, mostrando un mensaje en la siguiente función.
    function userValidation(username, password) {
        for(let i = 0; i < usersDatabase.length; i++) {
            if(usersDatabase[i].username.toLowerCase() === username.toLowerCase() && 
               usersDatabase[i].password === password) {
                return true;
            } 
        }
        return false;
    }

    

    //Función que una vez ha validado nombre y contraseña, muestra el feed en un div final que mientras no se accede, permanece bloqueado.
    function logIn(username, password) {
        const resultDiv = document.getElementById('result')

        if(userValidation(username, password)) {
            resultDiv.style.display = 'block'

            //Después la variable busca en el objeto del feed el nombre igual al que se introduce (arrow fn) y primero se verá el post de la persona que accede.
            const userTimeline = usersTimeLine.find(user => user.username.toLowerCase() === username.toLowerCase())

            //Aquí se modifica el contenido del html con el post que ha escrito el usuario.
            let htmlContent = `
            <p class="welcome-message">Welcome back, ${username}! 🎉</p>
            <p>Mi post: "${userTimeline.timeline}"</p>`

            //El bucle forEach itera cada objeto del array de la timeline (arrow fn). Y lo que hará el if será fijarse en la condición para que cuando itere y encuentre el mismo nombre de quien inició sesión evite mostrarse de nuevo su post, porque ya aparece primero. Y += va añadiendo.
            usersTimeLine.forEach(user => {
                if(user.username.toLowerCase() !== username.toLowerCase()) {
                htmlContent += `
                    <p><strong>${user.username}</strong>: ${user.timeline}</p>`;
                }
            })
            
            //Esto hace que "pegue" el contenido que sacamos del forEach en el div para el feed.
            resultDiv.innerHTML = htmlContent

        } else {
            //Por el contrario si la primera función devuelve false, añadiendo contenido al html.
            resultDiv.innerHTML = `
            <p>❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.</p>`;
            resultDiv.style.display = 'block';
        }
    }

    //Esto "escucha" al submit y hace un evento que será la acción del usuario cuando envía los datos, y así aparezca el feed.
    document.getElementById('form').addEventListener('submit', function(event) {

        //Evitamos el refresco de la página con esto
        event.preventDefault()
        
        //Y esto capta los datos que el usuario introduce en los inputs
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        //Finalmente llamamos a la función que le pasa los valores del inicio
        logIn(username, password)
    })
})