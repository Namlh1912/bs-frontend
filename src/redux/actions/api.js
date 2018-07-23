import { toast } from "react-toastify"

const BASE_URL = 'http://earthling.studio:9969/'

function parseFormData(data) {
	const formData = new FormData()

	for (let i in data) {
		if (data.hasOwnProperty(i) && data[i] !== undefined) {
			formData.append(i, data[i])
		}
	}

	return formData
}

export default function callApi(dispatch, actionType, url, opts = {}) {
	const [request, success, failure] = [
		actionType,
		`${actionType}_SUCCESS`,
		`${actionType}_FAILURE`
	]
	const req = {}
	const apiServer = BASE_URL

	opts.method && (req.method = opts.method)
	opts.headers && (req.headers = opts.headers)
	opts.body &&
	(req.body = opts.type === "json" ? opts.body : parseFormData(opts.body))

	dispatch({ type: request })

	fetch(apiServer + url, req)
		.then(res => {
			if (opts.resType === "text") {
				return res.text()
			}
			if (res.status === 204) {
				return res
			}
			return res.json()
		})
		.then(res => {
			if (res.name === "Error") {
				toast.error(res.message, { autoClose: 2000 })
				dispatch({
					type: failure,
					error: res.message
				})
			} else {
				if (
					opts.method === "POST" ||
					opts.method === "PUT" ||
					opts.method === "PATCH" ||
					opts.method === "DELETE"
				) {
					toast.success("Success!", { autoClose: 2000 })
				}
				dispatch({
					type: success,
					result: res.data || res
				})
				if (opts.callBack) {
					opts.callBack(res)
				}
			}
		})
		.catch(res => {
			toast.error("Error! Please try again!", { autoClose: 2000 })
			dispatch({
				type: failure,
				error: "Error! Please try again!"
			})
		})
}