**Show Product**
----
  Returns json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	id : 12,
	category_id : 5,
	name : "nicola mod dot medium shoulder bag",
	price : 448,
	image_link : "https://katespade.insnw.net/KateSpade/PXRUA361_892?$large$",
	post_date : "2019-04-02",
	color : "Black Multi",
	score : 0,
	description : "the nicola mod dot medium shoulder bag is a retro-inspired twist on our bag of the same name. crafted from smooth tri-color leather and gently structured for everyday use, this style's flap is adorned with playful cutout dots--each designed with one half open and the other half polished gold-tone metal for a little bit of shine."
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`