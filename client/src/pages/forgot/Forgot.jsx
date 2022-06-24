import React, { useState } from 'react';
import classNames from "classnames";
import { Formik, Field } from 'formik';
import * as Yup from 'yup'
import { Link } from "react-router-dom";

const Forgot = props => {
    const ForgotSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email cannot be blank'),
    })

	return <Formik  initialValues={{}} validationSchema={ForgotSchema}>
		{
			({ handleSubmit, isSubmitting, touched, errors, isValid, dirty }) => <form  onSubmit={handleSubmit}>
				<div className="mb10">
					<img src={""} alt="Social" />
				</div>
				<div className="multi-container">
					<div>
						<h5>Forgot Password</h5>
						{
							<div className="form-group">
								<p >Don't worry! Just enter your registered email address. We'll send you a password reset link.</p>
								<label htmlFor="inputEmail" >Registered Email</label>
								<Field type="email" name="email" id="forgetpassword-email" placeholder="Email"  />
								<div className="row">
									<div className="col-6">
										<button  type="button">
                                            <Link to='/login'>
                                            Back to Login</Link></button>
									</div>
									<div className="col-6">
										<button type="submit" disabled={isSubmitting || !isValid || !dirty}>Send Reset Link</button>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</form>
		}
	</Formik>
}
export default Forgot;