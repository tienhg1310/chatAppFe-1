window.onload = function() {
	var tabControlBtn = document.querySelectorAll(".tab-control-btn");
	var tabFormLogin = document.querySelector(".login-form");
	var tabFormRegister = document.querySelector(".register-form");
	var imageFile = document.querySelector(".image-profile");


	tabControlBtn.forEach(function(element, index) {
		element.addEventListener("click", function() {
			if (element.classList.contains("login")) {
				tabFormLogin.classList.add("active");
				tabFormRegister.classList.remove("active");
			} else {
				tabFormRegister.classList.add("active");
				tabFormLogin.classList.remove("active");
			}
			tabControlBtn.forEach(function(element) {
				element.classList.remove("active");
			});
			this.classList.add("active");
		});
	});



	
}