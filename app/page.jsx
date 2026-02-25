import Loading from "./components/Loading";
import Products from "./components/Products";
import React, { Suspense } from 'react';

export default function Page({searchParams}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Products searchParams={searchParams}/>
      </Suspense>
    </div>
  );
}
