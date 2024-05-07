const userLocalStorageToken = localStorage.getItem('token');
const userDetails = [];

function fetchUserDetails() {
    return new Promise((resolve, reject) => {
        const userLocalStorageToken = localStorage.getItem('token');
        fetch(`http://localhost:3333/api/v1/get/byToken`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userLocalStorageToken}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                console.log("Unauthorized");
                window.location.href = "/welcome";
                reject(new Error("Unauthorized"));
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            userDetails.push(data);
            resolve();
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

const userDetailsPromise = fetchUserDetails();