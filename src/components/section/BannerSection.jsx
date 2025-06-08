import { getBannerData, getWatchUrl, media } from '@/lib/api'
import React, { Suspense } from 'react'
import { Skeleton } from '../atom/Skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { InboxIcon } from 'lucide-react';

async function BannerSection({ fetcher }) {
  return (
    <Suspense fallback={<BannerSectionFallback />}>
      <BannerSectionContent fetcher={fetcher} />
    </Suspense>
  )
}


async function BannerSectionContent({ fetcher }) {
  const data = await fetcher();
  // console.log(data);
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[500px] py-12">
        <InboxIcon
          className="w-32 h-32 text-slate-400 mb-10"
          strokeWidth={1.2}
        />
        <p className="text-lg text-gray-500">No items found.</p>
      </div>
    );
  }
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full  md:px-0 px-4"
    >
      <CarouselContent className="">
        {data?.map((vid) => (
          <CarouselItem key={vid.id} className="w-full max-w-[700px] h-[500px]">
            <Link href={getWatchUrl(vid.id, vid.media_type, vid?.poster_path)}>
              <Image
                src={media(vid?.poster_path)}
                alt=""
                width={700}
                height={500}
                className="w-full h-full bg-slate-600 rounded-lg object-cover"
                quality={30}
              />
            </Link>

          </CarouselItem>
        ))}
      </CarouselContent>
      
        <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-15 h-15 opacity-70 hover:opacity-100 transition-opacity duration-200" />
        <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2 z-10 w-15 h-15 opacity-70 hover:opacity-100 transition-opacity duration-200" />
      
    </Carousel>
  )
}
function BannerSectionFallback() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
      <Skeleton className="h-[500px] w-[700px] rounded-lg" />
    </div>
  )

}

export default BannerSection;