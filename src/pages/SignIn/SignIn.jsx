import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/form/Input/Input";
import TextLink from "../../components/ui/TextLink/TextLink";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useStateValue } from "../../contexts/context API/StateProvider";

function SignIn() {
	const [, dispatch] = useStateValue();
	const navigate = useNavigate();

	// Refs for the inputs
	const emailRef = useRef();
	const passwordRef = useRef();

	// Ref for submit button
	const submitButtonRef = useRef();

	// Loading state
	const [loading, setLoading] = useState(false);

	// Function to get the data from the form
	function getSignInFormData() {
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();

		return { email, password };
	}

	// Function to create messages to Feedback component from error codes
	function createFeedbackMessage(errorCode) {
		switch (errorCode) {
			case "auth/invalid-credential": {
				return { message: "Email or password is incorrect", details: "" };
			}
			default: {
				return { message: "An error occured.", details: "Please try again later." };
			}
		}
	}

	// Function that reset the submit button
	function resetSubmitButton() {
		setLoading(false);
		submitButtonRef.current.removeAttribute("disabled");
	}

	// Function to sign in the user
	async function signInUser(e) {
		e.preventDefault();

		// Actions before signup
		setLoading(true);
		submitButtonRef.current.setAttribute("disabled", "true");

		// 1. Get the form data
		const formData = getSignInFormData();
		// console.log("Form data:", formData);

		// 2. Sign in the user
		const { email, password } = formData;
		try {
			// Sign in the user based on email and password
			await signInWithEmailAndPassword(auth, email, password);

			// Actions after signin
			resetSubmitButton();

			// Navigate to Overview page
			navigate("/overview");
		} catch (e) {
			console.log("Error signing in the user.", e);
			// Give feedback from the error
			const { message, details } = createFeedbackMessage(e.code);
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message,
					details,
				},
			});

			// Actions after signin
			resetSubmitButton();
		}
	}

	return (
		<Auth className="signIn">
			<Modal title="Sign In">
				<form className="signInForm" onSubmit={signInUser}>
					<Auth.Body>
						<Input
							type="text"
							id="signInEmail"
							label="Email"
							placeholder="Email"
							required
							fullW
							ref={emailRef}
						/>
						<Input
							type="password"
							id="signInPassword"
							label="Password"
							placeholder="Password"
							required
							fullW
							ref={passwordRef}
						/>

						<Auth.Text>
							Don&apos;t have an account? <TextLink to="/signup">Click here</TextLink> to
							create one!
						</Auth.Text>
					</Auth.Body>

					<Modal.Footer>
						<Link to="/">
							<Button type="button" variant="secondary" tabIndex={-1}>
								Cancel
							</Button>
						</Link>
						<Button type="submit" variant="accent" ref={submitButtonRef}>
							{loading ? "Loading..." : "Sign In"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Auth>
	);
}

export default SignIn;
