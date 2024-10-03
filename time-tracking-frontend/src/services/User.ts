interface RegisterFormProps {
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
}

export async function fetchRegisterUser({ name, email, password, passwordConfirm }: RegisterFormProps) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
        }),
    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message)
    }
    console.log(data)
    return data
}
