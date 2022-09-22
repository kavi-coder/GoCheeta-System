import React from 'react';

function Dashboard() {
    const logged_user=JSON.parse(localStorage.getItem('logged_user'));

    return (
        <div>

            <table id="customers">
                <tr>
                    <th>Item Name</th>
                    <th>Brand</th>
                    <th>Quantity</th>
                    {logged_user?(
                        <th>Order</th>
                    ):(
                        <></>
                    )}
                    
                </tr>

                {/* {item ? (
                    item.map((d)=> 
                        <>
                            <tr>
                                <td>{d.item_name}</td>
                                <td>{d.item_brand}</td>
                                <td>{d.item_quantity}</td>
                                {logged_user?(
                                    <td>
                                        <Link to={{
                                            pathname: `/ordernow/${d.item_id}`,
                                            state: {stateParam: true}
                                        }}>Order Now</Link>
                                    </td>
                                ):(
                                    <></>
                                )}
                                
                            </tr>
                        </>
                    )
                    ) : (
                        <>
                            <p>Loading...</p>
                        </>
                    )
                } */}
                
            </table>
            
            
        </div>
        
    )
}

export default Dashboard