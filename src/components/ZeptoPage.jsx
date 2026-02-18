import React from 'react'
import AboveSection from './AboveSection'
import AllTabs from './AllTabs'
import CategoryCard from './CategoryCard'
import CartSheet from './CartSheet'

const ZeptoPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('all')

  return (
    <div className="bg-[#f3f3f4] pb-4 md:min-h-screen">
      <AboveSection />
      <AllTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="mx-auto w-full max-w-[1280px]">
        <CategoryCard activeCategory={activeCategory} />
      </div>
      <CartSheet />
    </div>
  )
}

export default ZeptoPage
