-- CreateTable
CREATE TABLE `clients` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `created_by` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clients_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_locations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `client_id` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `location` VARCHAR(200) NULL,
    `created_by` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_by` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `units_code_key`(`code`),
    UNIQUE INDEX `units_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    `client_id` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `unit_id` BIGINT NOT NULL,
    `unit_code` VARCHAR(20) NOT NULL,
    `unit_name` VARCHAR(50) NOT NULL,
    `document_url` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(12, 2) NULL,
    `created_by` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_active` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `items_client_id_number_key`(`client_id`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_cards` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    `client_id` BIGINT NOT NULL,
    `physical_location_id` BIGINT NOT NULL,
    `physical_location_name` VARCHAR(100) NOT NULL,
    `physical_location_location` VARCHAR(200) NOT NULL,
    `item_id` BIGINT NOT NULL,
    `item_number` VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
    `item_document_url` VARCHAR(191) NULL,
    `item_name` VARCHAR(100) NOT NULL,
    `item_description` VARCHAR(191) NULL,
    `item_price` DECIMAL(12, 2) NULL,
    `unit_id` BIGINT NOT NULL,
    `unit_code` VARCHAR(20) NOT NULL,
    `unit_name` VARCHAR(50) NOT NULL,
    `type` ENUM('IN', 'OUT', 'ADJUSTMENT') NOT NULL,
    `reference_no` VARCHAR(50) NULL,
    `quantity` INTEGER NOT NULL,
    `total_price` DECIMAL(12, 2) NULL,
    `note` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'POSTED') NOT NULL DEFAULT 'DRAFT',
    `created_by` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `posted_by` VARCHAR(100) NULL,
    `posted_at` DATETIME(3) NULL,

    INDEX `idx_stock_cards_item_loc_date`(`item_name`, `physical_location_name`, `client_id`),
    INDEX `idx_stock_cards_date`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(100) NOT NULL,
    `record_id` BIGINT NOT NULL,
    `action` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    `old_data` JSON NULL,
    `new_data` JSON NULL,
    `changed_by` VARCHAR(100) NOT NULL,
    `changed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `physical_locations` ADD CONSTRAINT `physical_locations_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_cards` ADD CONSTRAINT `stock_cards_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_cards` ADD CONSTRAINT `stock_cards_physical_location_id_fkey` FOREIGN KEY (`physical_location_id`) REFERENCES `physical_locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_cards` ADD CONSTRAINT `stock_cards_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_cards` ADD CONSTRAINT `stock_cards_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
