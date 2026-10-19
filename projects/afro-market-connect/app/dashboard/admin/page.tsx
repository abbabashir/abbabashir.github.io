"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/lib/context";
import { formatNaira } from "@/lib/imageCompressor";
import { Order } from "@/lib/types";
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building,
  Eye,
  FileText,
  DollarSign,
  Users,
  Store,
  ArrowUpRight,
  Search,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    orders,
    verifyEscrow,
    rejectEscrow,
    updateOrderStatus,
    vendors,
    products,
    currentRole,
    setCurrentRole,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<"escrow_queue" | "custody_ledger" | "disputes" | "vendors">("escrow_queue");
  const [selectedProofOrder, setSelectedProofOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Filter orders needing verification
  const pendingProofOrders = orders.filter((o) => o.status === "proof_submitted");
  const verifiedCustodyOrders = orders.filter((o) => o.status === "escrow_verified" || o.status === "dispatched");
  const disputedOrders = orders.filter((o) => o.status === "disputed");

  // Metrics
  const totalEscrowInCustody = orders
    .filter((o) => o.status === "escrow_verified" || o.status === "dispatched")
    .reduce((sum, o) => sum + o.total, 0);

  const totalProcessedVolume = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  // Handlers
  const handleApprove = (order: Order) => {
    verifyEscrow(order.id, `Bank credit alert confirmed for ${formatNaira(order.total)}. Funds locked in AfroMarket Escrow Custody.`);
    if (selectedProofOrder?.id === order.id) {
      setSelectedProofOrder(null);
    }
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProofOrder || !rejectReason) return;
    rejectEscrow(selectedProofOrder.id, rejectReason);
    setShowRejectModal(false);
    setSelectedProofOrder(null);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen py-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Super Admin Operations Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Escrow Custody & Dispute Console
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Verify incoming bank transfers, manage manual escrow accounts, oversee market stalls, and resolve merchant disputes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRole("buyer")}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Switch to Shopper
            </button>
            <button
              onClick={() => setCurrentRole("vendor")}
              className="px-3 py-1.5 rounded-lg bg-brand-tangerine text-white text-xs font-bold hover:bg-amber-600"
            >
              Switch to Vendor Stall
            </button>
          </div>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Awaiting Verification
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black text-brand-tangerine">
                {pendingProofOrders.length}
              </span>
              <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                ⏳
              </span>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Receipts pending manual bank check
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Escrow Funds in Custody
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl sm:text-2xl font-black text-brand-blue truncate">
                {formatNaira(totalEscrowInCustody)}
              </span>
              <span className="w-9 h-9 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-sm">
                🔒
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
              Held securely until delivery inspection
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Active Disputes
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black text-red-600">
                {disputedOrders.length}
              </span>
              <span className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
                ⚠️
              </span>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Requiring admin arbitration
            </span>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Total Escrow Processed
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl sm:text-2xl font-black text-gray-900 truncate">
                {formatNaira(totalProcessedVolume + 150000)}
              </span>
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                ✓
              </span>
            </div>
            <span className="text-[10px] text-gray-500 mt-1 block">
              Completed transactions with zero fraud
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("escrow_queue")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "escrow_queue"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>Escrow Verification Queue</span>
            {pendingProofOrders.length > 0 && (
              <span className="bg-brand-tangerine text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                {pendingProofOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("custody_ledger")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "custody_ledger"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>Active Custody Ledger</span>
            <span className="text-gray-400 font-normal">({verifiedCustodyOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("disputes")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "disputes"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>Disputes & Arbitration</span>
            {disputedOrders.length > 0 && (
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                {disputedOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("vendors")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "vendors"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>Verified Market Merchants</span>
            <span className="text-gray-400 font-normal">({vendors.length})</span>
          </button>
        </div>

        {/* TAB 1: ESCROW VERIFICATION QUEUE */}
        {activeTab === "escrow_queue" && (
          <div className="space-y-4">
            {pendingProofOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Queue is Clear</h3>
                <p className="text-xs text-gray-500 mt-1">
                  All uploaded bank transfer proofs have been verified and confirmed in Escrow Custody.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Orders List */}
                <div className="lg:col-span-7 space-y-3">
                  {pendingProofOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-purple-400 shadow-subtle transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                        <div>
                          <span className="font-mono font-bold text-sm text-gray-900">
                            {ord.referenceId}
                          </span>
                          <p className="text-xs text-gray-500">
                            Buyer: <strong>{ord.buyerName}</strong> ({ord.buyerPhone})
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-brand-blue">
                            {formatNaira(ord.total)}
                          </span>
                          <span className="text-[10px] text-gray-400 block">
                            Custody: {ord.escrowAccount.bankName}
                          </span>
                        </div>
                      </div>

                      {/* Payment Proof summary */}
                      {ord.paymentProof && (
                        <div className="my-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500 text-[10px] block">Sender Bank:</span>
                            <span className="font-semibold text-gray-900">{ord.paymentProof.senderBank}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-[10px] block">Sender Account Name:</span>
                            <span className="font-semibold text-gray-900 truncate block">
                              {ord.paymentProof.senderAccountName}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500 text-[10px] block">Bank Reference / Session ID:</span>
                            <span className="font-mono font-bold text-brand-blue">
                              {ord.paymentProof.transactionReference}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => setSelectedProofOrder(ord)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                          <span>Inspect Receipt Photo</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProofOrder(ord);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
                          >
                            Reject Proof
                          </button>

                          <button
                            onClick={() => handleApprove(ord)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Confirm & Hold Escrow</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Receipt Inspector Panel */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle sticky top-24">
                    <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">
                      Receipt Proof Inspector
                    </h3>

                    {selectedProofOrder && selectedProofOrder.paymentProof ? (
                      <div className="space-y-4">
                        <div className="relative h-72 w-full rounded-xl overflow-hidden border border-gray-300 bg-gray-900 shadow-inner">
                          <Image
                            src={selectedProofOrder.paymentProof.receiptUrl}
                            alt="Receipt Inspector"
                            fill
                            className="object-contain"
                          />
                        </div>

                        <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-xl border">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order:</span>
                            <span className="font-mono font-bold">{selectedProofOrder.referenceId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Expected Total:</span>
                            <span className="font-bold text-brand-blue">{formatNaira(selectedProofOrder.total)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time:</span>
                            <span>{selectedProofOrder.paymentProof.transferTimestamp}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(selectedProofOrder)}
                            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                          >
                            Approve Escrow Funds
                          </button>
                          <button
                            onClick={() => setShowRejectModal(true)}
                            className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 font-bold text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-16 text-center text-gray-400 text-xs">
                        Select an order from the list to preview the bank transfer receipt.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE CUSTODY LEDGER */}
        {activeTab === "custody_ledger" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-subtle">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Active Escrow Custody Ledger (Funds Locked)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Order Ref</th>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Stall / Merchant</th>
                    <th className="pb-3">Escrow Value</th>
                    <th className="pb-3">Bank Reference</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {verifiedCustodyOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50">
                      <td className="py-3 font-mono font-bold text-gray-900">
                        {ord.referenceId}
                      </td>
                      <td className="py-3">
                        <span className="font-semibold text-gray-800">{ord.buyerName}</span>
                        <span className="text-[10px] text-gray-400 block">{ord.buyerPhone}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-brand-blue font-semibold">
                          {ord.items[0]?.product.vendorName || "Market Stall"}
                        </span>
                        <span className="text-[10px] text-gray-400 block">
                          {ord.items[0]?.product.marketHub}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-gray-900">
                        {formatNaira(ord.total)}
                      </td>
                      <td className="py-3 font-mono text-gray-600 text-[11px]">
                        {ord.paymentProof?.transactionReference || "N/A"}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ord.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() =>
                            updateOrderStatus(
                              ord.id,
                              "dispatched",
                              "Admin issued dispatch clearance to vendor logistics team.",
                              "admin"
                            )
                          }
                          className="px-2.5 py-1 rounded-md bg-blue-50 text-brand-blue hover:bg-blue-100 font-bold text-[11px]"
                        >
                          Mark Dispatched
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DISPUTES & ARBITRATION */}
        {activeTab === "disputes" && (
          <div className="space-y-4">
            {disputedOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Zero Active Disputes</h3>
                <p className="text-xs text-gray-500 mt-1">
                  All current transactions are proceeding smoothly without buyer grievances.
                </p>
              </div>
            ) : (
              disputedOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-5 border border-red-300 shadow-subtle">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="font-mono font-bold text-gray-900 text-sm">
                        {ord.referenceId} – Frozen Escrow ({formatNaira(ord.total)})
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                      Disputed
                    </span>
                  </div>

                  <div className="my-3 text-xs bg-red-50/50 p-3 rounded-xl border border-red-200">
                    <span className="font-bold text-red-900 block mb-1">Dispute Reason / Details:</span>
                    <p className="text-red-800">
                      {ord.statusHistory[ord.statusHistory.length - 1]?.note || "Goods discrepancy reported by customer."}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          ord.id,
                          "pending_payment",
                          "Admin arbitrated in favor of Buyer. Full escrow refund triggered to buyer's bank account.",
                          "admin"
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs"
                    >
                      Refund Escrow to Buyer
                    </button>
                    <button
                      onClick={() =>
                        updateOrderStatus(
                          ord.id,
                          "completed",
                          "Admin verified seller provided correct delivery tracking. Escrow released to Vendor.",
                          "admin"
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Release Escrow to Vendor
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: VERIFIED MERCHANTS DIRECTORY */}
        {activeTab === "vendors" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.map((ven) => (
              <div key={ven.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex items-start gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0 relative border">
                  <Image src={ven.avatarImage} alt={ven.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{ven.name}</h4>
                    {ven.verified && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-brand-blue font-semibold mt-0.5">
                    📍 {ven.stallAddress} ({ven.marketHub})
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{ven.bio}</p>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Sales: {ven.totalSales} orders</span>
                    <Link
                      href={`/vendor/${ven.slug}`}
                      className="font-bold text-brand-blue hover:underline flex items-center gap-1"
                    >
                      <span>Public Storefront</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Reject Payment Proof
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                State the reason why the payment proof cannot be approved (e.g. amount transferred doesn't match total, or funds not received in bank statement).
              </p>

              <form onSubmit={handleReject} className="space-y-3">
                <textarea
                  required
                  rows={3}
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:border-purple-600 outline-none"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
