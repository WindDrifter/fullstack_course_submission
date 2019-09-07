const dummy = (blogs) => {
    return 1
  }
  
const totalLikes= (blogs) => {
    let copy = [...blogs]
    let total = copy.reduce((prev, current)=>{
        return current.likes + prev

    }, 0)
    return total;

}

const favoriteBlog = (blogs) =>{
    let returnValue = {likes: -1};
    blogs.forEach((blog)=>{
        if(blog.likes>returnValue.likes){
            returnValue=blog
        }
    });
    return returnValue;

}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

