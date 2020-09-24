import AsyncStorage from '@react-native-community/async-storage';

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const loginToServer = (email, password) => {
  fetch('https://cart-handling.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain;charset=UTF-8'
    },
    body: JSON.stringify({
      name: email,
      password: password
    })
  })
    .then((response) => {
      return response.text()
    })
    .then((responseJson) => {
      console.log("Login Token:\n " + responseJson)

      storeStringData("loginToken", responseJson)

    })
    .catch((error) => {
      console.log(error)
    })
};

export const signUpToServer = (email, password) => {
  console.log('on signUpToServer')
  fetch('https://cart-handling.herokuapp.com/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: email,
      password: password
    })
  })
    .then((res) => {
      console.log(res.status)
      return res.json()
    })

    .catch((error) => {
      console.log(error)
    })
};

export const bindCartToServer = async (token) => {
  console.log('binding shopping cart to the server')
  fetch('https://cart-handling.herokuapp.com/bind/0', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + await getStringData("loginToken"),
    },
  })

    .then((response) => {
      return response.text()
    })
    .then((responseJson) => {
      console.log("Bind Token:\n " + responseJson)

      storeStringData("bindToken", responseJson)

    })
    .catch((error) => {
      console.log(error)
    })
};


// //====================== asynce storage store and read data ====================

//Storing string value
export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log("storing string asynce data")
    console.log('key=' + key + 'value=' + value)
  } catch (e) {
    // saving error
  }
}

//Storing object value
export const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

//Reading string value
export const getStringData = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    // read error
  }

  console.log('Done.')
}


//Reading object value
export const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}