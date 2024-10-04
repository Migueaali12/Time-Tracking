import { UserAlert } from "../components/RegisterForm"
import { FormikHelpers } from "formik"

interface RegisterFetchProps {
    values: {
        name: string;
        lastName: string;
        email: string;
        password: string;
        passwordConfirm: string;
    };
    actions: FormikHelpers<{
        name: string;
        lastName: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }>;
    setAlert: React.Dispatch<React.SetStateAction<UserAlert>>
}

export async function fetchRegisterUser({ values, actions, setAlert }: RegisterFetchProps) {
  const res = await fetch('http://127.0.0.1:8000/api/auth/registere', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirm,
    }),
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message)
  }

  if (data.status === 200) {
    setAlert({hidden: false, type: 'success'})
    actions.resetForm()
  }
  setAlert({hidden: false, type: 'error'})
    actions.resetForm()
}
