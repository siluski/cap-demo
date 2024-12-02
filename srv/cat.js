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

    srv.before('CREATE', 'Orders', async(req)=>{
        let order = req.data;
        if(order.amount <=0 || !order.amount){
            throw new Error('Invalid order amount');
        }

        let tx = cds.transaction(req);
        let affectedRows = await tx.run(
            UPDATE(Books).set({stock:{'-=':order.amount}}).where({stock:{'>=':order.amount}, ID:{'==':order.book_ID}})
            )
            if(affectedRows === 0) {
                throw new Error('Not enough stock available');
            }
    });

}