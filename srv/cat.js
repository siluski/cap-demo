const cds = require('@sap/cds');

module.exports = async (srv) =>{

    srv.on('READ', 'Books', async (req) =>{
        console.log(req.user.roles);
        return cds.tx().run(req.query);
    });

    srv.after('READ', 'Books', async (books)=>{
        if(!Array.isArray(books)){
            books = [books];
        }

        books.forEach(book => {
            if(book.stock < 111){
                book.title+= "--Low stock! 11% Discount!";
                book.price = Math.round((book.price - (book.price*0.11))*100)/100;
            }
        });
    });

}