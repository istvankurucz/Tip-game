import Input from "../../components/form/Input/Input";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import TextLink from "../../components/ui/TextLink/TextLink";
import "./SignUp.css";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
	const navigate = useNavigate();

	// Refs for the inputs
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const policyRef = useRef();

	// Ref for submit button
	const submitButtonRef = useRef();

	// Loading state
	const [loading, setLoading] = useState(false);

	// Function to get the data from the form
	function getSignUpFormData() {
		const username = usernameRef.current.value.trim();
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();
		const passwordConfirm = passwordConfirmRef.current.value.trim();
		const policy = policyRef.current.checked;

		return { username, email, password, passwordConfirm, policy };
	}

	// Function to validate the data coming from the form
	function validateSignUpFormData(formData) {
		const { password, passwordConfirm, policy } = formData;

		if (password !== passwordConfirm)
			return { ok: false, message: "Password and Password Confirm don't match." };
		if (!policy) return { ok: false, message: "The Data Policy is not approved." };
		return { ok: true, message: "" };
	}

	// Function to create a user with Firebase
	async function signUpUser(e) {
		e.preventDefault();

		// Actions before signup
		setLoading(true);
		submitButtonRef.current.setAttribute("disabled", "true");

		// 1. Get the form data
		const formData = getSignUpFormData();
		// console.log("Form data:", formData);

		// 2. Validate form data
		const validationResult = validateSignUpFormData(formData);
		if (!validationResult.ok) {
			console.log(validationResult.message);
			return;
		}

		// 3. Sign up the user
		const { username, email, password } = formData;
		try {
			// Create the user based on email and password
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			// console.log("Response from signup:", user);

			// Update the displayName of the user with username
			await updateProfile(user, {
				displayName: username,
			});
			// console.log("User at the end of signup process:", user);

			// Actions after signup
			setLoading(false);
			submitButtonRef.current.removeAttribute("disabled");

			// Navigate to Overview page
			navigate("/overview");
		} catch (e) {
			console.log("Error signing up the user.", e);

			// Actions after signup
			setLoading(false);
			submitButtonRef.current.removeAttribute("disabled");
		}
	}

	return (
		<Auth className="signUp">
			<Modal title="Sign Up">
				<form className="signUpForm" onSubmit={signUpUser}>
					<Auth.Body>
						<Input
							type="text"
							id="signUpUsername"
							label="Username"
							placeholder="Username"
							required
							fullW
							ref={usernameRef}
						/>
						<Input
							type="email"
							id="signUpEmail"
							label="Email"
							placeholder="Email"
							required
							fullW
							ref={emailRef}
						/>
						<Input
							type="password"
							id="signUpPassword"
							label="Password"
							placeholder="Password"
							required
							fullW
							ref={passwordRef}
						/>
						<Input
							type="password"
							id="signUpPasswordConfirm"
							label="Password Confirm"
							placeholder="Password Confirm"
							required
							fullW
							ref={passwordConfirmRef}
						/>

						<Checkbox
							id="signUpPolicy"
							label="I have read and understand the Data Policy of Tip game."
							ref={policyRef}
						/>

						<Auth.Text>
							Already have an account? <TextLink to="/signin">Click here</TextLink> to sign
							in!
						</Auth.Text>
					</Auth.Body>

					<Modal.Footer>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
						<Button type="submit" variant="accent" ref={submitButtonRef}>
							{loading ? "Loading..." : "Sign Up"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Auth>
	);
}

export default SignUp;
