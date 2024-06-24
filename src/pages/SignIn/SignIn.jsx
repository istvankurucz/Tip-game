import Auth from "../../components/layout/Auth/Auth";
import Modal from "../../components/layout/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/form/Input/Input";
import TextLink from "../../components/ui/TextLink/TextLink";
import "./SignIn.css";

function SignIn() {
	return (
		<Auth className="signIn">
			<Modal title="Sign In">
				<form className="signInForm">
					<Auth.Body>
						<Input
							type="text"
							id="signInEmail"
							label="Email"
							placeholder="Email"
							required
							fullW
						/>
						<Input
							type="password"
							id="signInPassword"
							label="Password"
							placeholder="Password"
							required
							fullW
						/>

						<Auth.Text>
							Don&apos;t have an account? <TextLink to="/signup">Click here</TextLink> to
							create one!
						</Auth.Text>
					</Auth.Body>

					<Modal.Footer>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
						<Button type="submit" variant="accent">
							Sign In
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Auth>
	);
}

export default SignIn;
