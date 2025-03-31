function insert()
{
    var name = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("edad").value;

    fetch('https://providers-shard-00-00.popd7.mongodb.net:27017', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            email: email,
            edad: age
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Data inserted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error inserting data!');
    });
    console.log(name);
    console.log(email);
}