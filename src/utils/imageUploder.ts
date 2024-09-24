const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${
	import.meta.env.VITE_IMAGE_HOSTING_API_KEY
}`;

const imageUploader = async (e) => {
	try {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		const res = await fetch(imageHostingAPI, {
			method: "post",
			body: formData,
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err;
	}
};

export default imageUploader;
