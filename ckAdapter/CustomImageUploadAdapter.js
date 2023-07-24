// Import necessary dependencies
import { Plugin } from '@ckeditor/ckeditor5-core'

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
    reader.onerror = error => reject(error);
  });
}

class CustomImageUploadAdapter extends Plugin {
	init() {
		const editor = this.editor
		// const editorConfig = editor.config._config
		// console.log(editorConfig)
		// Register the image upload adapter
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return new UploadAdapter(loader, editor)
		}
	}
}

class UploadAdapter {
	constructor(loader, editor) {
		this.loader = loader
		this.editor = editor
	}

	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					this._initRequest()
					this._initListeners(resolve, reject, file)
					this._sendRequest(file)
				})
		)
	}

	// Aborts the upload process.
	abort() {
		if (this.xhr) {
			this.xhr.abort()
		}
	}

	// Initializes the XMLHttpRequest object using the URL passed to the constructor.
	_initRequest() {
		const xhr = (this.xhr = new XMLHttpRequest())
		const editorConfig = this.editor.config._config
		// Note that your request may look different. It is up to you and your editor
		// integration to choose the right communication channel. This example uses
		// a POST request with JSON as a data structure but your configuration
		// could be different.
		console.log(editorConfig)
		xhr.open('POST', 'https://api-dev.socialbread.id/storage/api/uploadFiles', true)
		xhr.responseType = 'json'
	}

	// Initializes XMLHttpRequest listeners.
	_initListeners(resolve, reject, file) {
		const xhr = this.xhr
		const loader = this.loader
		const genericErrorText = `Couldn't upload file: ${file.name}.`

		xhr.addEventListener('error', () => {
			// resolve({
			// 	default: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
			// })
			reject(genericErrorText)
		})
		xhr.addEventListener('abort', () => reject())
		xhr.addEventListener('load', () => {
			const response = xhr.response

			// This example assumes the XHR server's "response" object will come with
			// an "error" which has its own "message" that can be passed to reject()
			// in the upload promise.
			//
			// Your integration may handle upload errors in a different way so make sure
			// it is done properly. The reject() function must be called when the upload fails.
			if (!response || response.error) {
				return reject(
					response && response.error ? response.error.message : genericErrorText
				)
			}

			// If the upload is successful, resolve the upload promise with an object containing
			// at least the "default" URL, pointing to the image on the server.
			// This URL will be used to display the image in the content. Learn more in the
			// UploadAdapter#upload documentation.
			resolve({
				default: 'https://social-bread-dev.s3.ap-southeast-1.amazonaws.com/' + response.data,
			})
		})

		// Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
		// properties which are used e.g. to display the upload progress bar in the editor
		// user interface.
		if (xhr.upload) {
			xhr.upload.addEventListener('progress', (evt) => {
				if (evt.lengthComputable) {
					loader.uploadTotal = evt.total
					loader.uploaded = evt.loaded
				}
			})
		}
	}

	// Prepares the data and sends the request.
	async _sendRequest(file) {
		// Prepare the form data.
		const data = new FormData()
		data.append('file', file)
		data.append('key', 'partner-academy-cover')
    // await convertToBase64(file)
    //   .then(base64File => {
    //     // console.log(base64File)
		// 		return 'www.google.com'
    //   })

		// Important note: This is the right place to implement security mechanisms
		// like authentication and CSRF protection. For instance, you can use
		// XMLHttpRequest.setRequestHeader() to set the request headers containing
		// the CSRF token generated earlier by your application.

		// Send the request.
		this.xhr.send(data)
	}
}

export default CustomImageUploadAdapter
