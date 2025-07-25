"use client";

import { useState, useMemo, useEffect } from "react";
import { dummyData } from "../Data";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X, Filter, GripVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { motion, AnimatePresence } from "motion/react";

const ALL_COLUMNS = [
    { label: "ID", value: "id" },
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
    { label: "Status", value: "status" },
];

const SORTABLE_FIELDS = [
    { label: "Name", value: "name" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
    { label: "Status", value: "status" },
];

type SortCriterion = {
    field: string;
    order: "asc" | "desc";
};

type DataItem = {
    id: string;
    [key: string]: any;
};

// Animation variants
const sortItemVariants = {
    initial: { opacity: 0, y: 20, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -100 },
    hover: { scale: 1.02 },
    drag: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
};

const tableRowVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, blur: 10, transition: { duration: 0.3 } },
};

export default function SortableTableWithSortPanel() {
    const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>(() => {

        //Persistent Data InLocatstorage

        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sortCriteria");
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch {
                    alert("Error parsing sort criteria from localStorage");
                }
            }
        }
        return [];
    });
    const [data] = useState<DataItem[]>(() =>
        dummyData.map((item) => ({
            id: String(item.id),
            name: item.name,
            email: item.email,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            status: item.status,
        }))
    );

    const sensors = useSensors(useSensor(PointerSensor));

    const sortedFields = sortCriteria.map((s) => s.field);
    const columnOrder = [
        ...sortedFields,
        ...ALL_COLUMNS.map((c) => c.value).filter(
            (col) => !sortedFields.includes(col)
        ),
    ];

    const sortedData = useMemo(() => {
        if (sortCriteria.length === 0) return data;

        return [...data].sort((a, b) => {
            for (const { field, order } of sortCriteria) {
                const aValue = a[field];
                const bValue = b[field];

                if (field === "createdAt" || field === "updatedAt") {
                    const dateA = new Date(aValue).getTime();
                    const dateB = new Date(bValue).getTime();
                    if (dateA < dateB) return order === "asc" ? -1 : 1;
                    if (dateA > dateB) return order === "asc" ? 1 : -1;
                    continue;
                }

                if (aValue < bValue) return order === "asc" ? -1 : 1;
                if (aValue > bValue) return order === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortCriteria]);

    const addSort = (field: string) => {
        if (sortCriteria.find((s) => s.field === field)) return;
        setSortCriteria([...sortCriteria, { field, order: "asc" }]);
    };

    const removeSort = (field: string) => {
        setSortCriteria(sortCriteria.filter((s) => s.field !== field));
    };

    const toggleOrder = (field: string) => {
        setSortCriteria(
            sortCriteria.map((s) =>
                s.field === field
                    ? { ...s, order: s.order === "asc" ? "desc" : "asc" }
                    : s
            )
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = sortCriteria.findIndex((s) => s.field === active.id);
        const newIndex = sortCriteria.findIndex((s) => s.field === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const reordered = arrayMove(sortCriteria, oldIndex, newIndex);
            setSortCriteria(reordered);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("sortCriteria", JSON.stringify(sortCriteria));
        }
    }, [sortCriteria]);

    return (
        <motion.section
            initial={{
                opacity: 0,
                filter: `blur(10px)`
            }}
            animate={{
                opacity: 1,
                filter: `blur(0px)`
            }}
            transition={{
                ease: "linear",
                duration: 0.3,
                delay: 0.2
            }}
            className="w-screen flex justify-center font-sans">
            <div className="max-w-7xl shadow-2xl rounded-2xl p-10 w-full">
                <h2 className="text-3xl font-semibold mb-6">Client Table</h2>

                <div className="mb-6 flex flex-row gap-2 items-center">
                    <p className="text-lg font-medium">Sort Panel</p>
                    <div className="flex gap-3 items-center">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" /> Add Sort
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <h4 className="font-medium font-sans leading-none">
                                        Sortable Fields
                                    </h4>
                                    <div className="grid gap-2">
                                        {SORTABLE_FIELDS.map((f) => (
                                            <SortablePopoverItem
                                                key={f.value}
                                                field={f}
                                                onAdd={addSort}
                                                disabled={sortCriteria.some((s) => s.field === f.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={sortCriteria.map((s) => s.field)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="flex flex-wrap lg:flex-nowrap gap-2 border justify-center text-sm p-2 bg-white rounded shadow w-full min-h-2">
                                    <AnimatePresence>
                                        {sortCriteria.length === 0 && (
                                            <motion.span
                                                className="text-gray-400 text-sm font-sans"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                No sort fields selected.
                                            </motion.span>
                                        )}
                                        {sortCriteria.map(({ field, order }) => (
                                            <motion.div
                                                key={field}
                                                layout
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                whileHover="hover"
                                                whileDrag="drag"
                                                variants={sortItemVariants}
                                                transition={{
                                                    type: "spring",
                                                    damping: 20,
                                                    stiffness: 100,
                                                }}
                                            >
                                                <SortableItem
                                                    field={field}
                                                    order={order}
                                                    onToggle={toggleOrder}
                                                    onRemove={removeSort}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>
                        </DndContext>

                        <Button
                            variant="destructive"
                            onClick={() => setSortCriteria([])}
                            className="ml-auto cursor-pointer"
                        >
                            Clear All
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columnOrder.map((col) => (
                                    <TableHead key={col}>
                                        {ALL_COLUMNS.find((c) => c.value === col)?.label || col}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {sortedData.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        layout // Add layout animation for smooth reordering
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={tableRowVariants}
                                        transition={{ type: "tween", damping: 20, stiffness: 100 }}
                                    >
                                        {columnOrder.map((col) => (
                                            <TableCell
                                                suppressHydrationWarning
                                                key={`${item.id}-${col}`}
                                            >
                                                {col === "createdAt" || col === "updatedAt"
                                                    ? new Date(item[col]).toLocaleString()
                                                    : item[col]}
                                            </TableCell>
                                        ))}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </motion.section>
    );
}

function SortablePopoverItem({
    field,
    onAdd,
    disabled,
}: {
    field: { label: string; value: string };
    onAdd: (field: string) => void;
    disabled?: boolean;
}) {
    return (
        <motion.div whileTap={{ scale: 0.98 }}>
            <Button
                variant="outline"
                onClick={() => onAdd(field.value)}
                disabled={disabled}
                className="w-full justify-start font-sans"
            >
                Add {field.label}
            </Button>
        </motion.div>
    );
}

function SortableItem({
    field,
    order,
    onToggle,
    onRemove,
}: {
    field: string;
    order: "asc" | "desc";
    onToggle: (field: string) => void;
    onRemove: (field: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: field });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const label =
        SORTABLE_FIELDS.find((f) => f.value === field)?.label ||
        ALL_COLUMNS.find((f) => f.value === field)?.label ||
        field;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between border gap-2 rounded text-sm  cursor-move "
        >
            <div {...attributes} {...listeners} className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-left text-sm font-sans w-20 ">
                    {label}
                </span>
            </div>
            <div className="flex gap-2 items-center">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(field);
                    }}
                    className="hover:bg-neutral-200"
                >
                    {order === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(field);
                    }}
                    className="hover:bg-neutral-200"
                >
                    <X className="w-4 h-4 text-red-500" />
                </Button>
            </div>
        </div>
    );
}
