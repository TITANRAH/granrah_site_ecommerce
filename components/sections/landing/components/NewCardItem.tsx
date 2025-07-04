import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { NewResponse } from '@/interfaces/admin/news/new-response.interface';

interface NewCardItemProps {
    news: NewResponse
}
function NewCardItem({news}: NewCardItemProps) {
  return (
    <Card className="group h-[500px]  relative overflow-hidden border-red-500/20 bg-gradient-to-r from-red-900/30 via-black/80 to-red-800/20 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
    <div className="absolute top-5 md:top-4 right-4">
      <span className="px-3  py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full border border-red-400/30">
        {news.category.name}
      </span>
    </div>
    <div className="flex flex-col ">
      <div className="w-full relative">
        <div className="relative overflow-hidden pt-10 w-full">
          <Image
            src={news.srcImages[0] || ''}
            alt={news.title}
            width={1000}
            height={1000}
            className=" object-contain transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
      <div className="flex-1 p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold text-red-500 group-hover:text-red-400 transition-colors duration-300">
            {news.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <CardDescription className="text-white/90 mb-6 line-clamp-2">
            {news.noticeTextP1}
          </CardDescription>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 group-hover:translate-x-2 transition-all duration-300"
            asChild
          >
            <Link href={`/new/${news.id}`} className="group">
              Leer más
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  </Card>
  )
}

export default NewCardItem
