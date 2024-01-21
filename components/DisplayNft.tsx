import Image from 'next/image';
import { data } from '@/lib/data';

const DisplayNft = () => {
  return (
    <div className="bg-animate flex-1 rounded-3xl flex lg:flex-col items-center relative absolute inset-0 flex snap-x items-center gap-4 overflow-x-scroll h-81 px-[1rem] py-[1rem]">
      {data.items.map((nft, index) => (
        <div key={index} className="relative h-[200px] w-[200px] flex-shrink-0 snap-center lg:h-[400px] lg:w-[400px]">
          <Image className="rounded-[1rem] object-cover" src={nft.image_link} layout="fill" alt="nft" />
        </div>
      ))}
    </div>
  );
};

export default DisplayNft;
