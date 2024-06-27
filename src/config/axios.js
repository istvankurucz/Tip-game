import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.openligadb.de",
});

export { instance as axios };
