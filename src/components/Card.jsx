/* eslint-disable no-unused-vars */
import ArrowUpIcon from "@icons/ArrowUpIcon"
import ArrowDownIcon from "@icons/ArrowDownIcon"
import { motion } from "framer-motion"

const Card = ({ title, priceBuy, priceSell }) => {
  return (
    <>
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-[color:var(--card-bg)] rounded-2xl p-6 shadow-sm border border-[color:var(--border-color)] hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 relative flex flex-col h-full group"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[color:var(--border-color)]">
          <h3 className="text-lg font-semibold text-[color:var(--text-color)] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
        </div>

        <div className="space-y-5 mt-auto">
          {priceBuy !== undefined && (
            <div className="flex justify-between items-end">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-widest">Compra</span>
                <ArrowDownIcon className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-2xl font-bold text-[color:var(--text-color)] tracking-tighter">${priceBuy}</span>
            </div>
          )}

          {priceSell !== undefined && (
            <div className="flex justify-between items-end">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-widest">Venta</span>
                <ArrowUpIcon className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <span className="text-2xl font-bold text-[color:var(--text-color)] tracking-tighter">${priceSell}</span>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Card;
