import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AgentDecisionTable({ decisions = [] }: { decisions: any[] }) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {decisions.map((d, i) => (
            <motion.div
              key={d.time + i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex justify-between text-[11px] py-1 border-b border-white/5"
            >
              <span className={`font-bold ${d.action.includes('BUY') ? 'text-green-400' : 'text-pink-400'}`}>
                {d.action}
              </span>
              <span className="text-cyan-400">${d.price}</span>
              <span className="text-white/40">{(d.confidence * 100).toFixed(0)}%</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}