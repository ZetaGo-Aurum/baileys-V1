"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactManager = void 0;
const fs = require("fs");
const path = require("path");
const CONTACT_FILE = path.join(process.cwd(), 'user_contact.json');
const COUNTER_FILE = path.join(process.cwd(), 'counter.json');
class ContactManager {
    constructor() {
        this.cache = new Set();
        this.counter = 1;
        this.contacts = {};
        this.init();
    }
    init() {
        if (!fs.existsSync(CONTACT_FILE)) {
            fs.writeFileSync(CONTACT_FILE, JSON.stringify({}, null, 2));
        }
        if (!fs.existsSync(COUNTER_FILE)) {
            fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 1 }, null, 2));
        }
        try {
            this.contacts = JSON.parse(fs.readFileSync(CONTACT_FILE, 'utf-8'));
            const counterData = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf-8'));
            this.counter = counterData.count || 1;
            Object.keys(this.contacts).forEach(jid => this.cache.add(jid));
        }
        catch (error) {
            console.error('[ContactManager] Error loading data:', error);
        }
    }
    _save() {
        try {
            fs.writeFileSync(CONTACT_FILE, JSON.stringify(this.contacts, null, 2));
            fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: this.counter }, null, 2));
        }
        catch (error) {
            console.error('[ContactManager] Error saving data:', error);
        }
    }
    checkAndSave(jid, sock) {
        if (!jid || jid.includes('@g.us') || jid === 'status@broadcast')
            return;
        const normalizedJid = jid.split('@')[0] + '@s.whatsapp.net';
        
        // Skip if already in cache
        if (this.cache.has(normalizedJid)) {
            return;
        }

        // Logic to skip owner and bot number (assuming they are in contacts or injected config)
        // For now, we just rely on the existence check.
        // If sock is provided, we can also check if it's the bot's own ID
        if (sock && sock.user && sock.user.id) {
             const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
             if (normalizedJid === botId) return;
        }

        const codename = `ZetaGo-user${this.counter}`;
        this.contacts[normalizedJid] = {
            id: normalizedJid,
            name: codename,
            savedAt: new Date().toISOString()
        };
        this.cache.add(normalizedJid);
        this.counter++;
        this._save();
        console.log(`[AutoSafe] Saved new contact: ${normalizedJid} as ${codename}`);
        
        // Optional: If we had access to full sock here, we could try to push a sync
        // But the requirement is mainly about the internal list and counter.
    }
}
exports.ContactManager = new ContactManager();
