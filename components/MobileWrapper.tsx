'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

const SearchContainer = () => {
    const [ searchText, setSearchText ] = useState('');
    const [ products, setProducts ] = useState<any[]>([]);
    const [ focus, setFocus ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/product')
                .then(response => response.json())
                .then(json => setProducts(json.products));
        };
        fetchData();
    }, []);

    const blurSearch = () => {
        setTimeout(() => {
            setFocus(false);
        }, 700);
    };

    const ProductsSearchMap = products.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(searchText.toString().toLocaleLowerCase())
        );
    });

    return (
        <div className='searchMobile flexBetween'>
            <input
                placeholder='Search'
                className='text-white placeholder:text-white'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={blurSearch}
            />
            {
                searchText !== '' && <Image src='/icons/white-x.svg' alt='clear-search-text' height={30} width={30} onClick={() => setSearchText('')} />
            }
            {
                focus   &&  (
                    <div className='p-5 bg-white absolute border border-gray-400 rounded-2xl shadow top-17 w-[65%] max-md:w-full max-md:left-1'>
                        {
                            searchText === '' ?
                                (
                                    <p>Type anything ...</p>
                                )   :   (
                                    ProductsSearchMap.map((product, index) => (
                                        <Link href={`/product/${product.id}`} className='w-full p-2 border border-gray-300 rounded-2xl my-3 flex items-center gap-3' key={index}>
                                            <div className='flexCenter p-0.5 border w-fit rounded-xl'>
                                                <Image src={product.img} alt={product.title} width={30} height={30} />
                                            </div>
                                            <p>{product.title}</p>
                                        </Link>
                                    ))
                                )
                        }
                    </div>
                )
            }
        </div>
    )
}

const MobileSearch = () => {
    const [ mobile, setMobile ] = useState(false);
    return (
        <>
            <div className='p-1 border border-white rounded-full hidden max-md:block absolute top-2 right-2' onClick={() => setMobile(!mobile)}>
                <Image src='/icons/search.svg' alt='search' height={30} width={30} />
            </div>
            {
                mobile && <SearchContainer />
            }
        </>
    )
}

export default MobileSearch