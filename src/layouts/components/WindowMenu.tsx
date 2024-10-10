import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cls from 'classnames';

const menus = [
  { name: '工作台', path: '/' },
  { name: '工具', path: '/about' },
  { name: '个人中心', path: '/contact' },
  { name: '关于', path: '/services' },
]

export const WindowMenu = () => {
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState(pathname);
  return (
    <LayoutGroup>
      <AnimatePresence>
        <div className='flex items-center gap-4'>
          {
            menus.map((menu) => (
              <motion.div key={menu.name} initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }} className={cls('relative text-tc-2 hover:text-tc-1 cursor-pointer px-2 py-1',{
                  '!text-tc-1': currentPath === menu.path
                })}
                onClick={() => setCurrentPath(menu.path)}
                >
                <div
                  className='relative font-semibold z-10'
                >
                  {menu.name}
                </div>
                {
                  currentPath === menu.path && (
                    <motion.div
                      layoutId='menu'
                      animate={{ width: '100%' }}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                      className='h-full w-full z-0 bg-surface-5 rounded-xl absolute bottom-0 left-0 shadow'
                    />
                  )
                }
              </motion.div>
            ))
          }
        </div>
      </AnimatePresence>
    </LayoutGroup>
  )
}