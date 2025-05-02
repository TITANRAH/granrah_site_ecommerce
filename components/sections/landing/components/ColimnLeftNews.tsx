import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import ShareButtons from '@/components/common/ShareButtons'
import { NewResponse } from '@/interfaces/admin/news/new-response.interface'


function ColimnLeftNews({currentNew}: {currentNew: NewResponse}) {
  return (
    <div className="lg:col-span-2">
            <Link
              href="/#news"
              className="mb-8 px-4 py-2 w-24 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Link>
            <div className="bg-background/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-red-500/20">
              <div className="relative h-[400px] w-full">
                <Image
                  src={currentNew.srcImages[0] || ""}
                  alt={currentNew.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full border border-red-400/30">
                    {currentNew.category.name}
                  </span>
                  <span className="text-gray-400">
                    {new Date(currentNew.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-red-500 mb-6">
                  {currentNew.title}
                  <ShareButtons title={currentNew.title} />
                </h1>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentNew.noticeTextP1}
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ColimnLeftNews
