import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../redux/actions/actionsUser';

const RegistrationForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const registrationError = useSelector(state => state.user?.error);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, 'Имя пользователя должно содержать не менее 2 символов')
      .required('Имя пользователя обязательно'),
    email: Yup.string()
      .email('Неправильный формат E-mail')
      .required('E-mail обязателен'),
    telefon: Yup.string()
      .matches(/^[0-9]+$/, 'Телефон должен содержать только цифры')
      .min(10, 'Телефон должен содержать не менее 10 цифр')
      .required('Телефон обязателен'),
    password: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Пароль обязателен')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(registerUser(values));
      console.log('Пользователь успешно зарегистрирован!');
      onSuccess();
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Форма регистрации</h2>
      <Formik
        initialValues={{ userName: '', email: '', telefon: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Имя пользователя:</label>
              <Field type="text" name="userName" />
              <ErrorMessage name="userName" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>E-mail:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Телефон:</label>
              <Field type="text" name="telefon" />
              <ErrorMessage name="telefon" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Пароль:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
            <button type="submit" disabled={isSubmitting}>Зарегистрироваться</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
