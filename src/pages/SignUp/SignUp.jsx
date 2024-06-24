import Input from "../../components/form/Input/Input";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import TextLink from "../../components/ui/TextLink/TextLink";
import "./SignUp.css";

function SignUp() {
	return (
		<Auth className="signUp">
			<Modal title="Sign Up">
				<form className="signUpForm">
					<Auth.Body>
						<Input
							type="text"
							id="signUpEmail"
							label="Email"
							placeholder="Email"
							required
							fullW
						/>
						<Input
							type="password"
							id="signUpPassword"
							label="Password"
							placeholder="Password"
							required
							fullW
						/>
						<Input
							type="password"
							id="signUpPasswordConfirm"
							label="Password Confirm"
							placeholder="Password Confirm"
							required
							fullW
						/>

						<Checkbox
							id="signUpPolicy"
							label="I have read and understand the Data Policy of Tip game."
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
						<Button type="submit" variant="accent">
							Sign Up
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Auth>
	);
}

export default SignUp;
