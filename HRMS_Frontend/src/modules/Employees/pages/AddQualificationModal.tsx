import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props { onClose: () => void }

export default function AddQualificationModal({ onClose }: Props) {
  const { t } = useTranslation("employees");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {t("qualification.modal.title")}
            </h2>
            <p className="text-xs text-gray-400">
              {t("qualification.modal.description")}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Employee Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("emergencyContact.sections.employeeInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("qualification.fields.employeeId")}
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                  <option>#5456-25</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("qualification.fields.employeeName")}
                </label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          {/* Qualification Type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("qualification.sections.type")}
            </h3>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                {t("qualification.fields.type")}
              </label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 bg-white">
                <option value="">{t("qualification.placeholders.selectType")}</option>
                <option value="degree">{t("qualification.types.degree")}</option>
                <option value="certification">{t("qualification.types.certification")}</option>
                <option value="training">{t("qualification.types.training")}</option>
              </select>
            </div>
          </div>

          {/* Qualification Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              {t("qualification.sections.details")}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("qualification.fields.title")}
                </label>
                <input
                  placeholder={t("qualification.placeholders.title")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {t("qualification.fields.institution")}
                  </label>
                  <input
                    placeholder={t("qualification.placeholders.institution")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {t("qualification.fields.fieldOfStudy")}
                  </label>
                  <input
                    placeholder={t("qualification.placeholders.fieldOfStudy")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {t("qualification.fields.graduationYear")}
                  </label>
                  <input
                    placeholder={t("qualification.placeholders.graduationYear")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    {t("qualification.fields.gpa")}
                  </label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  {t("qualification.fields.verificationStatus")}
                </label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
            }}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center text-center transition ${
              dragOver ? "border-blue-400 bg-blue-50" : "border-gray-200"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
              <Upload size={18} className="text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {file ? file.name : t("qualification.upload.dragAndDrop")}
            </p>
            {!file && (
              <p className="text-xs text-gray-400 mb-2">
                {t("qualification.upload.orBrowse")}
              </p>
            )}
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-1"
            >
              <Upload size={12} />
              {t("qualification.upload.chooseFile")}
            </button>
            <p className="text-xs text-gray-400 mt-2">
              {t("qualification.upload.supportedFormats")}
            </p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition"
          >
            {t("employee.cancel")}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {t("qualification.modal.addButton")}
          </button>
        </div>
      </div>
    </div>
  );
}