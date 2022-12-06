const sqlite3 = require('sqlite3').verbose();
let sql;


const db = new sqlite3.Database('./recipes_store.db3',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
})

function getAllRecipes(){
    let recipes = [];
    sql = 'SELECT * FROM recipes'
    db.all(sql,[],(err,rows)=>{
        if (err) return console.error(err.message);
        rows.forEach(row => {
            recipes.push(row)
            
        });
        console.log(recipes);
        return recipes;
    })
}

function getRecipeDetail(recipe_id){
    sql = 'SELECT * FROM recipes WHERE id = ' + recipe_id
    db.all(sql,[],(err,row)=>{     
        if (err) return console.error(err.message);
        console.log(row);
        return row;
    })
}

function getComments(recipe_id){
    let comments = [];
    sql = 'SELECT * FROM comments WHERE recipe_id = '+ recipe_id;
    db.all(sql,[],(err,rows)=>{
        if (err) return console.error(err.message);
        rows.forEach(row => {
            comments.push(row)
            
        });
        console.log(comments);
        return comments;
    })
}

function addComment(recipe_id,comment){
    sql = 'INSERT INTO comments(author,comment,recipe_id) VALUES (?,?,?)'
    db.run(sql,[comment.author,comment.comment,recipe_id],(err)=>{if (err) return console.error(err.message);})
}
getComments(3)

