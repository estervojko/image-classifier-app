
# Image Classifier App

**Link to the deployed app:**
http://berserk-food.surge.sh

### Basic Description

**How to use**

The app has 2 tabs, Predict and Search. In Predict, there's 2 options. You can either choose to upload a file from your file system or post a url link. After you do that, click submit. Then the Clarifai API (https://clarifai.com/), responds with the concepts it recognized in the image and the probabilities.

In the Search tab, you can upload multiple files, up to 128 images per API call. The API then tags the images with keywords depending on what it recognizes in the picture, and you can search by keyword. *I've already uploaded around 100 images to the service, and you can test the app by searching for keywords like: "park",
"fashion", "business", "sport". At the moment you can only write one word in the search bar. If it doesn't find any results it asks the user to use another keyword.*

### Wireframes

**Starting screen**

![alt text](https://github.com/estervojko/image-classifier-app/blob/master/image-classifier/wireframes/wireframe1.jpg?raw=true)

**Results from Predict**

![alt text](https://github.com/estervojko/image-classifier-app/blob/master/image-classifier/wireframes/wireframe2.jpg?raw=true)

**Search Screen**

![alt text](https://github.com/estervojko/image-classifier-app/blob/master/image-classifier/wireframes/wireframe3.jpg?raw=true)

**Search Results Screen**

![alt text](https://github.com/estervojko/image-classifier-app/blob/master/image-classifier/wireframes/wireframe4.jpg?raw=true)


### Challenges
I interacted with the API using their javascript client library. To send user-uploaded image files to the server, the images had to be converted to a base64 string, so I had to interact with the File API in order to make the proper request to the server.

```javascript

//handles multiple input files
handleMultiple(e){
  let files = e.target.files;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let obj;
    reader.onload = () => {
      let base64 = reader.result.substring(23);
      reader.abort();
      obj = {base64: base64};
    }
    reader.onloadend = () => {
      this.setState((state) => {
        console.log(this.state.searchObjs)
        return {searchObjs:[...state.searchObjs, obj]}});
    }
  });
  }

```

### Notes
It was interesting translating the wireframe into components but App.js is a bit too crowded and I could have done a better job in organizing the code.

### Post-MVP:
I plan to add a feature that allows you to upload an image and find images similar to it.
