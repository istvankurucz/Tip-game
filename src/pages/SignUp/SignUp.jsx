import Input from "../../components/form/Input/Input";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import TextLink from "../../components/ui/TextLink/TextLink";
import "./SignUp.css";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { doc, setDoc } from "firebase/firestore";
import { defaultTournament } from "../../assets/tournaments/tournaments";

function SignUp() {
	const [, dispatch] = useStateValue();
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

	// Function to set the signed up user in Firebase auth
	async function createUserAuth(username, email, password) {
		// Create the user based on email and password
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		// console.log("Response from signup:", user);

		// Update the displayName of the user with username
		await updateProfile(user, {
			displayName: username,
		});
		// console.log("User at the end of signup process:", user);

		return user;
	}

	// Function to set the default values for the user in the DB
	async function createUserDb(user) {
		const userRef = doc(db, "users", user.uid);
		await setDoc(userRef, {
			activeTournament: defaultTournament[0],
		});

		// Create the default tournament for the user
		const defaultTournamentRef = doc(db, `users/${user.uid}/tournaments/${defaultTournament[0]}`);
		await setDoc(defaultTournamentRef, {
			...defaultTournament[1],
			winner: "",
			topScorer: "",
		});
	}

	// Function to reset the submit button
	function resetSubmitButton() {
		setLoading(false);
		submitButtonRef.current.removeAttribute("disabled");
	}

	// Function to create messages to Feedback component from error codes
	function createFeedbackMessage(errorCode) {
		switch (errorCode) {
			case "auth/weak-password": {
				return { message: "The password must be at least 6 characters.", details: "" };
			}
			case "auth/email-already-in-use": {
				return { message: "The email is already used.", details: "" };
			}
			default: {
				return { message: "An error occured.", details: "Please try again later." };
			}
		}
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
			// console.log(validationResult.message);
			// Show feedback in connection with the error
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message: validationResult.message,
					details: "",
				},
			});

			resetSubmitButton();
			return;
		}

		// 3. Sign up the user
		const { username, email, password } = formData;
		try {
			// Sign up the user
			const user = await createUserAuth(username, email, password);

			// Create the user in the DB
			await createUserDb(user);

			// Actions after signup
			resetSubmitButton();

			// Navigate to Overview page
			navigate("/overview");
		} catch (e) {
			console.log("Error signing up the user.", e);
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

			// Actions after signup
			resetSubmitButton();
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
							Already have an account?{" "}
							<TextLink to="/signin" replace>
								Click here
							</TextLink>{" "}
							to sign in!
						</Auth.Text>
					</Auth.Body>

					<Modal.Footer>
						<Button type="button" variant="secondary" onClick={() => navigate(-1)}>
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
